/**
 * Survey Surfer (https://www.ennapd.com/surveysurferadminpanel)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ChartsModule } from 'ng2-charts';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import {HttpModule} from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SurveydetailsPage} from '../pages/surveydetails/surveydetails';
import {ReportPage} from '../pages/report/report';
import {SurveyPage} from '../pages/survey/survey';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {RawdataPage} from '../pages/rawdata/rawdata';
import {FrontPage} from '../pages/front/front';
import {AboutPage} from '../pages/about/about';
import {AdminprofilePage} from '../pages/adminprofile/adminprofile';
import { DatabaseProvider } from '../providers/database/database';
import {EditprofilePage} from '../pages/editprofile/editprofile';

import {File} from '@ionic-native/file';
import {Transfer} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
import {Camera} from '@ionic-native/camera';



var config = {
  apiKey: "AIzaSyAUDxdEmjmzkIkfnY1YmQ2s8nKAayNTHsE",
  authDomain: "survey-app-abhijeet.firebaseapp.com",
  databaseURL: "https://survey-app-abhijeet.firebaseio.com",
  projectId: "survey-app-abhijeet",
  storageBucket: "survey-app-abhijeet.appspot.com",
  messagingSenderId: "846435439336"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SurveydetailsPage,
    ReportPage,
    EditprofilePage,
    RawdataPage,
    SurveyPage,
    LoginPage,
    RegisterPage,
    FrontPage,
    AboutPage,
    AdminprofilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      scrollAssist : false
    }),
    ChartsModule,
    AngularFireModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgxErrorsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SurveydetailsPage,
    ReportPage,
    EditprofilePage,
    RawdataPage,
    SurveyPage,
    LoginPage,
    RegisterPage,
    FrontPage,
    AboutPage,
    AdminprofilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    File,
    Transfer,
    Camera,
    FilePath
  ]
})
export class AppModule {}
