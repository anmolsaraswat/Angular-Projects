/**
 * Survey Surfer (https://www.ennapd.com/surveysurferadminpanel)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class DatabaseProvider {
  isData = false;
  survey = [];
  questions = [];
  currentsurvey = [];
  responseprovider = [];
  allrespondent = [];
  currentrespondent = [];
  currentrespondentemail = [];
  currentuserid = "";
  useremail = "";
  currentuserdetails = {};
  user = false;
  isprofilepic = false;
  profilePicUrl = "";
  constructor(public afd: AngularFireDatabase) {
    //  this.getDataFromFireBase();
  }
//   getDataFromFireBase()
//   {
//     this.afd.list('/questions').valueChanges().subscribe(
//       data1=>{
//         this.questions = data1;
//          console.log(this.survey);
//     }
//   )
//     this.afd.list('/survey_list').valueChanges().subscribe(
//       data=>{
//         this.survey = data;
//          console.log(this.survey);
//     }
//   )
//   };
 }