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
import {DatabaseProvider} from '../../providers/database/database';
import { EditprofilePage } from '../editprofile/editprofile';
@IonicPage()
@Component({
  selector: 'page-adminprofile',
  templateUrl: 'adminprofile.html',
})
export class AdminprofilePage {
  userEmail;
  userPhone;
  userName;
  useraddress;
  constructor(public databasepro: DatabaseProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.databasepro.currentuserdetails[0].payload.val());
    this.userPhone = this.databasepro.currentuserdetails[3].payload.val();
    this.userEmail = this.databasepro.currentuserdetails[1].payload.val();
    this.userName = this.databasepro.currentuserdetails[2].payload.val();
    this.useraddress = this.databasepro.currentuserdetails[0].payload.val();
    console.log(databasepro.currentuserdetails[0].payload.val());
    console.log("Admin Page:",this.useraddress);
    // console.log(this.databasepro.profilePicUrl);
    
  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad AdminprofilePage');

  }
  editprofile()
  {
    this.navCtrl.push(EditprofilePage);
    console.log("function",this.databasepro.currentuserdetails[0].payload.val());
  }

}
