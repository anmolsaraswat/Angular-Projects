/**
 * Survey Surfer (https://www.ennapd.com/surveysurferadminpanel)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ReportPage} from '../report/report';
import {DatabaseProvider} from '../../providers/database/database';
import {AngularFireDatabase} from 'angularfire2/database';
import {LoadingController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {MenuController} from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-surveydetails',
  templateUrl: 'surveydetails.html',
})


export class SurveydetailsPage {
  surveyD = [];
  surveykey = "";
  ques = [];
  id :string;
  constructor(public menuCtrl: MenuController, private toastCtrl: ToastController, public alertCtrl: AlertController, public loadingCtrl: LoadingController ,public afd: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public databasepro: DatabaseProvider) {
    // this.menuCtrl.enable(false, 'myMenu');
    this.surveykey = this.navParams.get('para2');
    console.log(this.surveykey);
    this.surveyD = databasepro.currentsurvey;
    this.getDataFromFireBase();
  }
  print()
  {
    console.log("Hello");
    
  }

  getDataFromFireBase()
  {
    let loader = this.loadingCtrl.create({
      spinner : "ios",
      content: "Your page is loading",
    });
    loader.present();

    this.afd.list(`/questions/${this.surveykey}`).snapshotChanges().subscribe(
      data=>{
        this.ques = data;
        this.databasepro.questions = data;
        loader.dismiss();
        // this.surveyList = data[0].payload.val()
        console.log("DATA" , data);
        
        // console.log(this.ques[0].payload.val());
    }
  )
};

opensurvey()
{
  const confirm = this.alertCtrl.create({
    title: 'Open',
    message: 'Are you sure you want to open this survey?',
    buttons: [
      {
        text: 'Open',
        handler: () => {
          this.afd.database.ref(`survey_list/${this.surveykey}/`).update({
            status : 'open'
          });
          console.log("Survey Closed");
          let toast = this.toastCtrl.create({
            message: "The survey is successfully open.",
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
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

closesurvey()
{
  const confirm = this.alertCtrl.create({
    title: 'Close',
    message: 'Are you sure you want to close this survey?',
    buttons: [
      {
        text: 'Close',
        handler: () => {
          this.afd.database.ref(`survey_list/${this.surveykey}/`).update({
            status : 'closed'
          });
          console.log("Survey Closed");
          let toast = this.toastCtrl.create({
            message: "The survey is successfully closed.",
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
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

openPagereport()
  {
    this.navCtrl.push(ReportPage, {para: this.surveykey});
  }
  
  ionViewDidLoad() {
    // this.getDataFromFireBase();
    console.log('ionViewDidLoad SurveydetailsPage');
  }
}
