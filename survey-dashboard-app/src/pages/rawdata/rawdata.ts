/**
 * Survey Surfer (https://www.ennapd.com/surveysurferadminpanel)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database';



@IonicPage()
@Component({
  selector: 'page-rawdata',
  templateUrl: 'rawdata.html',
})
export class RawdataPage {

  ques = [];
  res = [];
  names = [];
  email = [];
  constructor(public menuCtrl: MenuController, public databasepro:DatabaseProvider, public navCtrl: NavController, public navParams: NavParams) {
    // this.menuCtrl.enable(false, 'myMenu');
    console.log(this.databasepro.currentrespondent);
    this.names =  this.databasepro.currentrespondent;
    this.email = this.databasepro.currentrespondentemail;
  }
 hello()
 {
   console.log("hello");
 }

  ionViewDidLoad() {
    this.ques = this.databasepro.questions;
    this.res = this.databasepro.responseprovider;
    console.log("Questions:", this.ques);
    console.log("Responses:", this.res);
    console.log("Single Response:",this.res[0].payload.val()[0]);
    
    console.log('ionViewDidLoad RawdataPage');
  }

}
