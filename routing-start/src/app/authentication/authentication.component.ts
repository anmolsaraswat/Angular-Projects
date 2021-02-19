import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData } from './authentication.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../placeholder/placeholder.directive';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit,OnDestroy {

  private closeSub: Subscription;
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  constructor(
    private authService: AuthenticationService, 
    private router: Router, 
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm){
    if (!form.valid)
    {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>
    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.logIn(email, password);
    }else {
      authObs = this.authService.signup(email,password);
    }

    authObs.subscribe(resData =>{
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/about']);
    },
    errorMessage =>{
      console.log(errorMessage);
      
      this.error= errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading =false;
    });
    form.reset();
  }
  private showErrorAlert(message: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this. closeSub =  componentRef.instance.close.subscribe(() =>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy(){
    if(this.closeSub)
    {
      this.closeSub.unsubscribe();
    }
  }
}