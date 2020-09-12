/**
 * Survey Surfer (https://www.ennapd.com/surveysurferadminpanel)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

 
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {AngularFireAuth} from 'angularfire2/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {DatabaseProvider} from '../../providers/database/database';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;
  loginError: string;
  myPhotoRef: any;


  @ViewChild('email') email;
  @ViewChild('password') pass;
  @ViewChild('name') name;
  constructor(public afd: AngularFireDatabase,public databasepro: DatabaseProvider, public fb: FormBuilder, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private fire: AngularFireAuth,  public navCtrl: NavController, public navParams: NavParams) {
    this.registerForm = fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    // this.myPhotoRef = firebase.storage().ref('/users');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  
  loginPage()
  {
    this.navCtrl.setRoot(LoginPage);
  }

  registerUser()
  {
   var userDetail = {
      name : this.name.value,
      role : "admin",
      address: "",
      email: this.email.value,
      phone_no: ""
    }
  let loader = this.loadingCtrl.create({
    spinner : "ios",
    content: "Registering you to the app.",
  });
  loader.present();
    
  this.fire.auth.createUserWithEmailAndPassword(this.email.value,this.pass.value)
    .then(data => {
      console.log('got data', this.email);
      console.log('User Created Successfully');
      this.databasepro.useremail = this.email.value;
      // console.log(this.databasepro.useremail);


      // Creating new user in the user table as the suer successfully sign up.

      this.afd.object('/users/'+String(this.fire.auth.currentUser.uid)).set(userDetail).then((data)=>{
        console.log("User Created Successful");
        console.log(userDetail);
      })
      .catch((err)=>
      {
        console.log(err)
      })

      let toast = this.toastCtrl.create({
        message: "User Created Successfully",
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      loader.dismiss();

      this.navCtrl.setRoot(LoginPage);
    })
    .catch(error => {
      loader.dismiss();
      let toast = this.toastCtrl.create({
        message: error.message,
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      console.log('got an error', error);
    });
  }
}
