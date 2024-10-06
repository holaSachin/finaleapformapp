import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { S3UploadService } from 'src/app/services/s3-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {
  static profilePageInstance: ProfileComponent;
  isImageUpload: boolean = false;
  prefixes = ['Mr', 'Ms', 'Mrs', 'M/S'];
  physicallychallenged = ['Yes', 'No'];
  maritals = ['Married', 'Unmarried', 'Single', 'Divorced'];
  communities = ['Hindu', 'Muslim', 'Christian', 'Jain', 'Sikh', 'Others'];
  categories = ['General', 'OBC', 'SC', 'ST', 'Reserved'];
  genders = ['Male', 'Female', 'Other'];

  constructor(public dataservice: DataService, private s3UploadService: S3UploadService) {
  }

  ngOnInit() {
    console.log('profile component');
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      if (image) {
        this.resizeAndPostImage(image);
      }
    } catch (error) {
      this.dataservice.displayToast('Error/Cancellation in taking picture:  ' + error, 'warning');
    }
  }

  async updloadImageToS3(dataURL: string) {
    const base64Response = await fetch(dataURL);
    const blob = await base64Response.blob();
    const imageFile = new Blob([blob], { type: 'image/*' }) as File;
    const strfile = 'userprofile_' + new Date().getTime() + '.png';
    const ret = await this.s3UploadService.uploadFileToS3(imageFile,strfile,'foodkartiposimages');
    if (ret) {
      console.log(ret)
      this.isImageUpload = true;
      const strurl = 'https://s3.ap-south-1.amazonaws.com/foodkartiposimages/' + strfile;
      this.dataservice.user.imgurl = strurl;
    }
  }

  async resizeAndPostImage(imageFile: any) {
    const img = new Image();
    img.src = imageFile.dataUrl;
    ProfileComponent.profilePageInstance = this;
    img.onload = (_event) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxW = 600;
      const maxH = 600;
      const iw = img.width;
      const ih = img.height;
      const scale = Math.min(maxW / iw, maxH / ih);
      const iwScaled = iw * scale;
      const ihScaled = ih * scale;
      canvas.width = iwScaled;
      canvas.height = ihScaled;
      if (ctx !== null) {
        ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
        const newdataURI = canvas.toDataURL('image/png');
        ProfileComponent.profilePageInstance.updloadImageToS3(newdataURI);
      }
    };
  }
}
