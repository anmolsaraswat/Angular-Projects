/**
 * Survey Surfer (https://www.ennapd.com/surveysurferadminpanel)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RegisterPage } from '../register/register';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database';
import {AngularFireDatabase} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loginError: string;

  @ViewChild('email') email;
  @ViewChild('password') pass;
  constructor(public afd: AngularFireDatabase, public databasepro: DatabaseProvider,public fb: FormBuilder, private toastCtrl: ToastController, private fire:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin()
  {
    let loader = this.loadingCtrl.create({
      spinner : "ios",
      content: "Logging you inside the app.",
    });
    loader.present();

    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.pass.value)
    .then(data=>{
      console.log('got some data', this.fire.auth.currentUser.uid);
      this.databasepro.currentuserid = this.fire.auth.currentUser.uid;
      console.log(this.databasepro.currentuserid);
      // console.log("User ID:" ,this.fire.);
      loader.dismiss();
      this.databasepro.user = true;
      this.navCtrl.setRoot(HomePage);
  })
  .catch(error =>{
    console.log('got an error', error);
    loader.dismiss()
    let toast = this.toastCtrl.create({
      message: error.message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();

  })

  }
  signup()
  {
    this.navCtrl.setRoot(RegisterPage);
  }
}
