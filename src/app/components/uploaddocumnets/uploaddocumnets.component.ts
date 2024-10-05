import { Component, OnInit } from '@angular/core';

interface UploadDocsLabelObj {
    value: string,
    label: string,
    details: string
  }

@Component({
  selector: 'app-uploaddocumnets',
  templateUrl: './uploaddocumnets.component.html',
  styleUrls: ['./uploaddocumnets.component.scss'],
})
export class UploaddocumnetsComponent  implements OnInit {
  uploadDocsLabelObj: UploadDocsLabelObj[];


  constructor() { }

  ngOnInit() {
    this.uploadDocsLabelObj = [
      {
        value: 'address',
        label: 'Upload current Address proof:',
        details: 'You can upload previous month\'s electricity bill or Rent Agreement'
      },
      {
        value: 'businesss',
        label: 'Upload business ownership proof:',
        details: 'You can upload incorporation certificate'
      },
      {
        value: 'residence',
        label: 'Upload residence ownership proof:',
        details: 'You can upload previous month\'s electricity bill or Rent Agreement'
      }
    ];
  }

  uploadImage(value: string) {

  }

}
