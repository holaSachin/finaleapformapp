import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reference } from 'src/app/modals/refrence';
import { User } from 'src/app/modals/user';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss'],
})
export class ReferenceComponent  implements OnInit {
  @Output() getReferenceDetails: EventEmitter<Reference> = new EventEmitter<Reference>()
  @Input() referenceNo: number;
  isBasicDetailsFilled: boolean = false
  referenceUser: Reference;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    if (this.referenceNo == 1) {
      this.referenceUser = this.dataService.user.references1;
    } else if (this.referenceNo == 2) {
      this.referenceUser = this.dataService.user.references2;
    }
  }

  validateReferenceDetails(): boolean {
    if (!this.referenceUser.firstname) {
      this.dataService.displayToast('Please enter your First Name', 'WARNING');
      return false;
    } 

    if (!this.referenceUser.lastname) {
      this.dataService.displayToast('Please enter your Last Name', 'WARNING');
      return false;
    }

    if (!this.referenceUser.mobno) {
      this.dataService.displayToast('Please enter your Mobile No', 'WARNING');
      return false;
    }

    if (isNaN(parseInt(this.referenceUser.mobno))) {
      this.dataService.displayToast('Mobile Number Should Be Numeric Value','WARNING');
      return false;
    }
    const mobno = '' + this.referenceUser.mobno;
    if (mobno.trim().length != 10) {
      this.dataService.displayToast('Invalid Mobile Number, Please Enter 10 digit Mobile Number.',
        'WARNING'
      );
      return false;
    }

    if (!this.referenceUser.email) {
      this.dataService.displayToast('Please enter your Email', 'WARNING');
      return false;
    }

    if (!this.dataService.validateEmail(this.referenceUser.email)){
      this.dataService.displayToast('Please enter a valid Email', 'WARNING');
      return false;
    }

    if (!this.referenceUser.relation) {
      this.dataService.displayToast('Please enter your Relation', 'WARNING');
      return false;
    }

    if (!this.referenceUser.yearsknown) {
      this.dataService.displayToast('Please enter your Years Known', 'WARNING');
      return false;
    }

    if (this.isBasicDetailsFilled) {
      if (!this.referenceUser.designation) {
        this.dataService.displayToast('Please enter your Designation', 'WARNING');
        return false;
      }
  
      if (!this.referenceUser.address) {
        this.dataService.displayToast('Please enter your Address', 'WARNING');
        return false;
      }
  
      if (!this.referenceUser.pincode) {
        this.dataService.displayToast('Please enter your Pincode', 'WARNING');
        return false;
      }
    }
    return true
  }

  goNextForMoreDetails() {
    if (this.validateReferenceDetails()) {
      this.getReferenceDetails.emit(this.referenceUser);
    }
  }

}
