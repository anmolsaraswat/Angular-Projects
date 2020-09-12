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
import {SurveyPage} from '../survey/survey';
import { AlertController } from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database';
import {AngularFireDatabase} from 'angularfire2/database';
import {LoadingController} from 'ionic-angular';
import {RawdataPage} from '../rawdata/rawdata';
import {MenuController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  ques = [];
  response = [];
  surveykey = "";
  respondentlocal = [];
  respondofsurvey = [];
  constructor(public menuCtrl: MenuController, public loadingCtrl: LoadingController ,public afd: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public databasepro: DatabaseProvider) {
    // this.menuCtrl.enable(false, 'myMenu');
    this.ques = databasepro.questions;
    this.surveykey = this.navParams.get('para');
    // console.log(this.ques);
    this.getDataFromFireBase();
  }

  getDataFromFireBase()
  {
    let loader = this.loadingCtrl.create({
      spinner : "ios",
      content: "Your page is loading",
    });
    loader.present();
    this.afd.list(`/response/${this.surveykey}`).snapshotChanges().subscribe(
      data=>{
        this.response = data;
        this.databasepro.responseprovider = data;
    }
  )
  this.afd.list(`/respondent`).snapshotChanges().subscribe(
    data1=>{
      this.respondentlocal = data1;
      this.databasepro.allrespondent = data1;
      console.log(this.databasepro.allrespondent[0].key);
  
  }
)

loader.dismiss();
};


openrawdatapage()
{
console.log(this.databasepro.allrespondent[0].key);
console.log(this.databasepro.responseprovider[0].key);


  for(var i=0; i<this.databasepro.allrespondent.length; i++)
  {
    for(var j=0; j<this.databasepro.responseprovider.length; j++)
    {
      if(this.databasepro.allrespondent[i].key == this.databasepro.responseprovider[j].key)
      {
        this.respondofsurvey.push(this.databasepro.allrespondent[i].payload.val().name);
        this.databasepro.currentrespondentemail.push(this.databasepro.allrespondent[i].payload.val().email);
        console.log("Responsees: ",this.databasepro.allrespondent[i].payload.val().name); 
      }
    }
  }
  this.databasepro.currentrespondent = this.respondofsurvey;

  this.navCtrl.push(RawdataPage);
}

openpagec(index)
{
  this.navCtrl.push(SurveyPage, {para: index});
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

}
