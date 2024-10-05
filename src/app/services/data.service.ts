import { Injectable } from '@angular/core';
import { User } from 'src/app/modals/user';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Reference } from 'src/app/modals/refrence';
// import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  activeSegment: 'personal' | 'business' | 'upload' = 'personal';
  user: User;
  currentPage: number = 1;
  isBasicDetailsFilled: boolean = false;

  constructor(public alertController: AlertController, public toastController: ToastController, public loadingController: LoadingController) {
    this.user = {} as User;
    this.user.references1 = {} as Reference;
    this.user.references2 = {} as Reference;
  }

  public async displayToast(
    msg: string,
    alerttype: string,
    position?: 'top' | 'bottom' | 'middle'
  ) {
    let stricon;
    let strcssclass;

    if (alerttype === 'SUCCESS') {
      stricon = 'checkmark-circle';
      strcssclass = 'success-toast';
    } else if (alerttype === 'FAIL') {
      stricon = 'ban';
      strcssclass = 'fail-toast';
    } else if (alerttype === 'WARNING') {
      stricon = 'warning';
      strcssclass = 'warning-toast';
    }

    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: strcssclass,
      position: position ? position : 'top',
      buttons: [
        {
          side: 'start',
          icon: stricon,
        },
      ],
    });
    toast.present();
  }

  // Simple loader
  simpleLoader(message?: string) {
    let strmsg = 'Loading..';
    if (message) {
      strmsg = message;
    }

    this.loadingController
      .create({
        message: strmsg,
      })
      .then((response) => {
        response.present();
      });
  }

  // Dismiss loader
  dismissLoader() {
    this.loadingController
      .dismiss()
      .then((response) => {
        //console.log('Loader closed!', response);
      })
      .catch((err) => {
        //console.log('Error occured : ', err);
      });
  }

  validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  // async uploadFiletoS3(file: File, strfilename: string, bucketname: string) {
  //   AWS.config.accessKeyId = 'VV/fnLvq8GS22kimXibj4m63SKWF4qndbnsi8oPL';
  //   AWS.config.secretAccessKey = 'AKIARPKP6CZJCNP3PZ47';
  //   AWS.config.region = 'ap-south-1';
  //   var params, contentType;
  //   if (strfilename.toUpperCase().indexOf("PDF") >= 0) {
  //       contentType = 'application/pdf';
  //       params = { Bucket: bucketname, Key: strfilename, ContentType: contentType, Body: file };
  //   }
  //   else {
  //       params = { Bucket: bucketname, Key: strfilename, Body: file };
  //   }
  //   var s3bucket = new AWS.S3({ params: { Bucket: bucketname } });
  //   var retpromise = await s3bucket.upload(params).promise();
  //   if (retpromise && retpromise.Location && retpromise.Location.length > 0) {
  //       return { status: 'success' };
  //   }
  //   else {
  //       return { status: 'error', statuserrorcode:702, errordescription: 'Error in file upload!' };
  //   }
  // }
  
}
