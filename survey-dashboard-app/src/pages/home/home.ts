/**
 * Survey Surfer (https://www.ennapd.com/surveysurferadminpanel)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import {SurveydetailsPage} from '../surveydetails/surveydetails';
import {Platform, Nav} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AdminprofilePage } from '../adminprofile/adminprofile';
import { AboutPage } from '../about/about';
import { FrontPage } from '../front/front';
import {AlertController} from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/observable';
import {map, filter, catchError, mergeMap} from 'rxjs/operators';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoadingController} from 'ionic-angular';
import { config } from 'rxjs';
import { Menu } from 'ionic-angular/components/app/menu-interface';
import * as firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // @ViewChild(Nav) nav: Nav;
  surveyList = [];
  surveykeys = [];
  photosRefDownload: any;
  id :string;
  myPhotoRef : any;
  loader : any;
  constructor(public menuCtrl: MenuController,public navCtrl : NavController, public loadingCtrl: LoadingController, private fire:AngularFireAuth, public afd: AngularFireDatabase, public platform: Platform, public alertCtrl: AlertController, public databasepro: DatabaseProvider) {
    this.menuCtrl.enable(true, 'myMenu');
    this.myPhotoRef = firebase.storage().ref('/users');
    this.getDataFromFireBase();
    this.getProfile();
  }

getProfile()
{
  this.myPhotoRef.child(this.databasepro.currentuserid+".jpg").getDownloadURL().then((url)=>{
    this.photosRefDownload = url;
    this.databasepro.profilePicUrl = this.photosRefDownload;
    // console.log(this.photosRefDownload);
    // console.log(this.databasepro.profilePicUrl);
    this.loader.dismiss();
  })
  .catch((err)=>
  {
    this.databasepro.profilePicUrl = "assets/imgs/profile.jpg";
    console.log("Hello");
    this.loader.dismiss();
  })
}


  ionViewDidLoad() {
    // this.surveyList = this.databasepro.survey;
    console.log(this.surveyList);
    console.log('ionViewDidLoad LoginPage');
  }
  getDataFromFireBase()
  {
    
     this.loader = this.loadingCtrl.create({
      spinner : "ios",
      content: "Your page is loading",
    });
    this.loader.present();

    this.afd.list('/survey_list').snapshotChanges().subscribe(
      data=>{
        this.surveyList = data;
        // console.log(this.surveyList[0].payload.val());    
      }
  )

this.afd.list(`/users/${this.databasepro.currentuserid}`).snapshotChanges().subscribe(
    data1=>{
      // console.log(this.databasepro.currentuserid);
      this.databasepro.currentuserdetails = data1;
      // this.databasepro.isData  = true;
      
        }
)
}

openPagedetails(index)
  {
    this.databasepro.currentsurvey = this.surveyList[index];
    // console.log(this.databasepro.currentsurvey);
    // console.log(this.surveyList[index].key);
    this.navCtrl.push(SurveydetailsPage, {para: index, para2: this.surveyList[index].key});
  }
}
