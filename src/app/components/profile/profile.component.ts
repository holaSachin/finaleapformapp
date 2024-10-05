import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/modals/user';
import { DataService } from 'src/app/services/data.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {
  // @Output() getPersonalDetails: EventEmitter<User> = new EventEmitter<User>;
  static profilePageInstance: ProfileComponent;
  isImageUpload: boolean = false;
  prefixes = ['Mr', 'Ms', 'Mrs', 'M/S'];
  physicallychallenged = ['Yes', 'No'];
  maritals = ['Married', 'Unmarried', 'Single', 'Divorced'];
  communities = ['Hindu', 'Muslim', 'Christian', 'Jain', 'Sikh', 'Others'];
  categories = ['General', 'OBC', 'SC', 'ST', 'Reserved'];
  genders = ['Male', 'Female', 'Other'];

  constructor(public dataservice: DataService) {
  }

  ngOnInit() {
    console.log('profile component');
  }

  // async takePicture() {
  //   try {
  //      const image = await Camera.getPhoto({
  //          quality: 80,
  //          allowEditing: false,
  //          resultType: CameraResultType.DataUrl,
  //          source: CameraSource.Camera,
  //     });
  //     if (image) {
  //       this.resizeAndPostImage(image);
  //     }

  //   } catch (error) {
  //     console.log('Error/Cancellation in taking picture:  ' + error);
  //   }
  // }

  // async updloadImageToS3(dataURL: string) {
  //   const base64Response = await fetch(dataURL);
  //   const blob = await base64Response.blob();
  //   const imageFile = new Blob([blob], { type: 'image/png' }) as File;
  //   const strfile = new Date().getTime() + '.png';
  //   const ret = await this.dataservice.uploadFiletoS3(imageFile,strfile,'foodkartiposimages');
  //   if (ret) {
  //     this.isImageUpload = true;
  //     const strurl = 'https://s3.ap-south-1.amazonaws.com/foodkartiposimages/' + strfile;
  //     this.dataservice.user.imgurl = strurl;
  //   }
  // }

  // async resizeAndPostImage(imageFile: any) {
  //   const img = new Image();
  //   img.src = imageFile.dataUrl;
  //   ProfileComponent.profilePageInstance = this;

  //   img.onload = (_event) => {
  //     const canvas = document.createElement('canvas');
  //     const ctx = canvas.getContext('2d');
  //     const maxW = 600;
  //     const maxH = 600;
  //     const iw = img.width;
  //     const ih = img.height;
  //     const scale = Math.min(maxW / iw, maxH / ih);
  //     const iwScaled = iw * scale;
  //     const ihScaled = ih * scale;
  //     canvas.width = iwScaled;
  //     canvas.height = ihScaled;
  //     if (ctx) {
  //       ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
  //     } else {
  //       console.error('Failed to get 2D drawing context');
  //     }
  //     const newdataURI = canvas.toDataURL('image/png');
  //     ProfileComponent.profilePageInstance.updloadImageToS3(newdataURI);
  //   };
  // }

}
