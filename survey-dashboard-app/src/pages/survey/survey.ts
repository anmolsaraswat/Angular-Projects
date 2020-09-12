/**
 * Survey Surfer (https://www.ennapd.com/surveysurferadminpanel)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App} from 'ionic-angular';
import { ReportPage } from '../report/report';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import {DatabaseProvider} from '../../providers/database/database';
import {AngularFireDatabase} from 'angularfire2/database';
import {MenuController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html',
})
export class SurveyPage {
public polarAreaLegend:boolean = true;
public polarAreaChartType:string = 'polarArea';
public doughnutChartType:string = 'doughnut';
public barChartType:string = 'bar';
public barChartLegend:boolean = true;
public barChartOptions:any = {
  scaleShowVerticalLines: true,
  responsive: true,
  scales: {
    yAxes: [{
      id: 'y-axis-0',
      gridLines: {
        display: true,
        lineWidth: 1,
        color: "rgba(0,0,0,0.30)"
      },
      ticks: {
        beginAtZero:true,
        mirror:false,
        suggestedMin: 0,
      },
      afterBuildTicks: function(chart) {

      }
    }],
    xAxes: [{
      id: 'x-axis-0',
      gridLines: {
        display: false
      },
      ticks: {
        beginAtZero: true
      }
    }]
}
};
barChartData:any[] = [];
plot = "pie";
quesno :number;
flag : boolean;
temp = 0;
response = [];
questions = [];
pieChartLabels:string[] = [];
pieChartData:number[] = [];
pieChartType:string;
  constructor(public menuCtrl: MenuController, public databasepro: DatabaseProvider, public navCtrl: NavController, public navParams: NavParams, public app: App) {
    // this.menuCtrl.enable(false, 'myMenu');
    this.quesno = this.navParams.get('para');
    this.response = this.databasepro.responseprovider;
    this.questions = this.databasepro.questions;
    console.log("Question Type",this.questions[this.quesno].payload.val().type);
    
    // console.log("Questions Length",this.questions.length-1);
    // console.log("Options" ,this.questions[this.quesno].payload.val().options);
    // console.log(this.questions[this.quesno].payload.val());
    // console.log(this.response[0].payload.val());
    // console.log( "Plot Page:",this.response[this.quesno].payload.val());
    // console.log("Type of question:", this.questions[this.quesno].payload.val().type);
    // console.log("Blah Blah", this.response[0].payload.val()[this.quesno]);

    }
  viewpie()
  {
    this.plot = "pie";
  }
  viewpolar(){
    this.plot = "polar";
  }
  viewdonut()
  {
    // console.log("hello1");
    this.plot = "donut";
  }
  viewbar()
  {
    this.plot = "bar";
  }

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  openprevious(a)
  {
    console.log("Clicked Previous");
    this.quesno --;
    this.cal();
  }
  opennext(a)
  {
    console.log("Clicked Next");
    this.quesno++;
    this.cal();
  }
  ionViewDidLoad() {
    this.cal();
  }

  cal()
  {
   if(this.plot == 'pie')
   {
     this.plot = 'donut';
   }
   else if(this.plot == 'donut')
   {
     this.plot = 'pie';
   }
   else if(this.plot =='polar')
   {
     this.plot = 'bar';
   }
   else if(this.plot =='bar')
   {
     this.plot = 'polar';
   }
// Resetting the variables as we are generating the plots on the same page again and again.

    this.pieChartData = [];
    this.pieChartLabels = [];

    // Temporary Array for the counts of labels.
    var temp: number[] = [];

    if(this.flag == true){
      console.log(this.flag);
      this.flag = false;
    }


    if (this.questions[this.quesno].payload.val().type == 'singleAnswer')
    {
      console.log("Initialization"); 
        this.pieChartLabels = this.questions[this.quesno].payload.val().options;
        console.log("Question Options:", this.pieChartLabels);
        
        for(var optioniterator=0; optioniterator<this.questions[this.quesno].payload.val().options.length; optioniterator++)
        {
          temp.push(0);
        }
        console.log(temp);

      for(var tupleiterator=0; tupleiterator<this.response.length; tupleiterator++)
      {
        for(optioniterator=0; optioniterator<this.questions[this.quesno].payload.val().options.length; optioniterator++)
        {
          if(this.response[tupleiterator].payload.val()[this.quesno] == this.pieChartLabels[optioniterator])
          {
            temp[optioniterator] ++;
          }
        }
      }
    }
    else if (this.questions[this.quesno].payload.val().type == 'dichotomous')
    {
      console.log("Initialization"); 
      this.pieChartLabels = ["Yes", "No"];
      console.log("Question Options:", this.pieChartLabels);

      temp = [0,0];

    for(var tupleiterator=0; tupleiterator<this.response.length; tupleiterator++)
    {
      for(optioniterator=0; optioniterator<2; optioniterator++)
      {
        if(this.response[tupleiterator].payload.val()[this.quesno] == this.pieChartLabels[optioniterator])
        {
          temp[optioniterator] ++;
        }
      }
    }
    }
    else if(this.questions[this.quesno].payload.val().type == 'checkbox')
    {
      console.log("Initialization"); 
      this.pieChartLabels = this.questions[this.quesno].payload.val().options;
      console.log("Question Options:", this.pieChartLabels);
      
      for(var optioniterator=0; optioniterator<this.questions[this.quesno].payload.val().options.length; optioniterator++)
      {
        temp.push(0);
      }
      console.log(temp);

       
      
    for(var tupleiterator=0; tupleiterator<this.response.length; tupleiterator++)
    {
      for(optioniterator=0; optioniterator<this.questions[this.quesno].payload.val().options.length; optioniterator++)
      { 
        if(this.response[tupleiterator].payload.val()[this.quesno] != "")
        {
        console.log("Ans",this.response[tupleiterator].payload.val()[this.quesno]);
        for (var ansiterator = 0; ansiterator< this.response[tupleiterator].payload.val()[this.quesno].length; ansiterator++)
        {
          if(this.response[tupleiterator].payload.val()[this.quesno][ansiterator] == this.pieChartLabels[optioniterator])
          {
            // console.log(this.pieChartLabels[optioniterator]);
            // console.log(this.response[0].payload.val()[this.quesno][ansiterator]);
            temp[optioniterator] ++;
          }
        }
      }
      }
      console.log(temp);
    }
    }
    console.log(this.pieChartLabels);
    console.log(this.pieChartData);
    this.pieChartData = temp;
    this.barChartData = [{data: temp, label:'Question'}];
    this.flag = true;
    this.pieChartType = 'pie';
    console.log('ionViewDidLoad SurveyPage');
  }
}