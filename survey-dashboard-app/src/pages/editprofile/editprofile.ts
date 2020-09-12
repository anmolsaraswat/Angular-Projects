/**
 * Survey Surfer (https://www.ennapd.com/surveysurferadminpanel)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, ViewChild } from '@angular/core';
import { IonicPage,ActionSheetController, NavController, NavParams} from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database';
import {AngularFireDatabase} from 'angularfire2/database';
import { AdminprofilePage } from '../adminprofile/adminprofile';
import {LoadingController} from 'ionic-angular';
import { HomePage } from '../home/home';
import {CameraOptions} from '@ionic-native/camera';
import * as firebase from 'firebase';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import {AngularFireAuth} from 'angularfire2/auth';



@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  @ViewChild('name') name;
  @ViewChild('phone') phoneno;
  @ViewChild('address') add;
  loader1: any;
  imageUrl = "";
  captureDataUrl = "";
  photosRefDownload: any;
  lastImage :string = null;
  loading;
 public myPhotoRef: any;
  userEmail;
  userPhone;
  userName;
  useraddress;
  constructor(public auth: AngularFireAuth, public file: File, public filePath: FilePath, public actionSheetCtrl: ActionSheetController,  public transfer: Transfer, public camera: Camera,public loadingCtrl: LoadingController, public afd: AngularFireDatabase,public databasepro: DatabaseProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.myPhotoRef = firebase.storage().ref('/users');
    this.userPhone = this.databasepro.currentuserdetails[3].payload.val();
    this.userEmail = this.databasepro.currentuserdetails[1].payload.val();
    this.userName = this.databasepro.currentuserdetails[2].payload.val();
    this.useraddress = this.databasepro.currentuserdetails[0].payload.val();
  }

  saveimage()
  {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons:[
        {
          text: 'Load from Library',
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture() {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
   
    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imageUrl = 'data:image/jpeg;base64,' + imageData;
      this.captureDataUrl = this.imageUrl;
    }, (err) => {
      // Handle error
    }).then(() => {
       this.loader1 = this.loadingCtrl.create({
        spinner : "ios",
        content: "Updating your profile Image",
      });
      // this.loader1.present();
      // this.uploadPhoto(this.imageUrl);
    })
   }
   
   openGallery() {
    const cameraOptions: CameraOptions = {
      quality: 50,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
   
    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imageUrl = 'data:image/jpeg;base64,' + imageData;
      this.captureDataUrl = this.imageUrl;
    }, (err) => {
      // Handle error
    }).then(()=>{
      this.loader1 = this.loadingCtrl.create({
        spinner : "ios",
        content: "Updating your profile Image",
      });
      // this.loader1.present();
      // this.uploadPhoto(this.imageUrl);
    });
   }

   getProfilePhoto(){
    this.myPhotoRef.child(this.databasepro.currentuserid+".jpg").getDownloadURL().then((url)=>{
      this.photosRefDownload = url;
      this.databasepro.profilePicUrl = this.photosRefDownload;
      console.log("TS", this.databasepro.profilePicUrl);
      // this.loader1.dismiss();
    })
  }

  uploadPhoto(imageUrl){
    this.myPhotoRef.child(this.databasepro.currentuserid+".jpg")
    .putString(imageUrl, firebase.storage.StringFormat.DATA_URL).then(()=>{
      console.log("Photo Uploaded successfully");
    }).then(() => {
      this.getProfilePhoto();
    }).then(() =>{
      this.navCtrl.setRoot(AdminprofilePage);
    });
  }

  saveprofile()
  { 
    // let loader = this.loadingCtrl.create({
    //   spinner : "ios",
    //   content: "Your page is loading",
    // });
    // loader.present();
    // setTimeout(() => {
    //   loader.dismiss();
    // }, 5000);

    // console.log(this.name.value);
    // console.log(this.phoneno.value);
    if(this.imageUrl != "")
    {
      this.uploadPhoto(this.imageUrl);
    }

    this.afd.database.ref(`users/${this.databasepro.currentuserid}/`).update({
      address : this.add.value,
      name : this.name.value,
      phone_no: this.phoneno.value
    });

    this.afd.list(`/users/${this.databasepro.currentuserid}`).snapshotChanges().subscribe(
      data1=>{
        // console.log(this.databasepro.currentuserid);
        this.databasepro.currentuserdetails = data1;
        // console.log("Provider Data:", this.databasepro.currentuserdetails[0].payload.val());
        this.navCtrl.setRoot(AdminprofilePage);
        })


 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

}
