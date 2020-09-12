/**
 * Survey Surfer (https://www.ennapd.com/surveysurferadminpanel)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import { FrontPage } from '../pages/front/front';
import {AlertController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {AdminprofilePage} from '../pages/adminprofile/adminprofile';
import {AboutPage} from '../pages/about/about';
import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = FrontPage;
  UserName = "";
  constructor(public databasepro: DatabaseProvider, private fire:AngularFireAuth, public alertCtrl: AlertController,public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
       console.log(this.UserName);
      console.log("App Page:", this.UserName);
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  exitApp(){
    const confirm = this.alertCtrl.create({
      title: 'Exit',
      message: 'Are you sure you want to exit the app?',
      buttons: [
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
 
 }
 logout()
 {
  const confirm = this.alertCtrl.create({
    title: 'Logout',
    message: 'Are you sure you want to logout?',
    buttons: [
      {
        text: 'Logout',
        handler: () => {
          this.fire.auth.signOut();
          this.databasepro.user = false;
          this.nav.setRoot(FrontPage);
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          console.log('Agree clicked');
        }
      }
    ]
  });
  confirm.present();
}
opensurveylist()
{
  this.nav.setRoot(HomePage);
}
 openprofile()
 {
   this.nav.setRoot(AdminprofilePage);
 }
 openabout()
 {
   this.nav.setRoot(AboutPage);
 }
}
