import { Component, OnInit } from '@angular/core';
import { S3UploadService } from '../../services/s3-upload.service';
import { DataService } from 'src/app/services/data.service';
import { LoadingController} from '@ionic/angular';

interface UploadDocsLabelObj {
    value: string,
    label: string,
    details: string,
    uploaded: boolean
  }

@Component({
  selector: 'app-uploaddocumnets',
  templateUrl: './uploaddocumnets.component.html',
  styleUrls: ['./uploaddocumnets.component.scss'],
})
export class UploaddocumnetsComponent  implements OnInit {
  uploadDocsLabelObj: UploadDocsLabelObj[];
  isLoading: boolean;

  constructor(private s3UploadService: S3UploadService,public dataService: DataService, public loadingCtrl: LoadingController,) { }

  ngOnInit() {
    this.uploadDocsLabelObj = [
      {
        value: 'address',
        label: 'Upload current Address proof:',
        details: 'You can upload previous month\'s electricity bill or Rent Agreement',
        uploaded: false
      },
      {
        value: 'businesss',
        label: 'Upload business ownership proof:',
        details: 'You can upload incorporation certificate',
        uploaded: false
      },
      {
        value: 'residence',
        label: 'Upload residence ownership proof:',
        details: 'You can upload previous month\'s electricity bill or Rent Agreement',
        uploaded: false
      }
    ];
  }


  async uploadImage(item: UploadDocsLabelObj) {
    // Create an input element to pick files
    this.showLoader('Uploading...');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/pdf'; 

    fileInput.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        const bucketName = 'foodkartiposimages';
        const result = await this.s3UploadService.uploadFileToS3(file, bucketName);
        this.hideLoader();
        console.log(result);
        if (result.status === 'success') {
          this.dataService.displayToast('File uploaded successfully', 'SUCCESS');
          item.uploaded = true;

        // Assign the URL to the respective user property based on item.value
        if (item.value === 'address') {
          this.dataService.user.addressproofurl = result.location || " ";  // Set the uploaded file URL to addressproofurl
        } else if (item.value === 'businesss') {
          this.dataService.user.ownershipproofurl = result.location || " ";  // Set the uploaded file URL to ownershipproofurl
        } else if (item.value === 'residence') {
          this.dataService.user.residenceproofurl = result.location || " ";  // Set the uploaded file URL to residenceproofurl
        }
        } else {
          this.dataService.displayToast('Error uploading file', 'FAIL');
        }
      }
    };

    // Programmatically click the file input to open the file picker
    fileInput.click();
    fileInput.oncancel = () => {
      this.dataService.dismissLoader();
    };
  }

  // Method to remove uploaded file
  removeFile(item:UploadDocsLabelObj) {
    // Reset the item's uploaded status
    item.uploaded = false;
  }

  hideLoader() {
    if (this.isLoading) {
      this.isLoading = false;
    }
    return this.loadingCtrl
      .dismiss()
      .then(() => console.log(''))
      .catch((e) => console.log(e));
  }

  showLoader(msg:string) {
    if (!this.isLoading) {
      this.isLoading = true;
    }
    return this.loadingCtrl
      .create({
        message: msg,
        spinner: 'bubbles',
      })
      .then((res) => {
        res.present().then(() => {
          if (!this.isLoading) {
            res.dismiss().then(() => {});
          }
        });
      })
      .catch((e) => {
        this.isLoading = false;
      });
  }
}
