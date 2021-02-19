import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'
import {throwError, Subject} from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refresehToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthenticationService{
    user = new Subject<User>();

    constructor(private http: HttpClient, private router: Router, private User: User){}

    autoLogin(){
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData)
        {
            return;
        }
        const Loadeduser = new User(userData.email,userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if(Loadeduser.token){
            this.user.next(Loadeduser);
        }
    }


    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
    }
    signup(email : string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBupC1FlTN1uVQhu1-I9ZBkt9v-J6xCH5g',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), tap(resData =>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken ,+resData.expiresIn)
            
        }));
    }
    logIn(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBupC1FlTN1uVQhu1-I9ZBkt9v-J6xCH5g',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData =>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken ,+resData.expiresIn)}))
    }

    private handleAuthentication(email: string,userId: string,  token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + +expiresIn *1000);
        const user = new User(
            email, 
            userId, 
            token, 
            expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }
    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.messsage){
            case 'EMAIL_EXISTS':
             errorMessage = 'This email exists already';
             break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;
          }
          return throwError(errorMessage);
    }
}