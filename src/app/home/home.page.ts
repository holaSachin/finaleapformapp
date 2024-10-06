import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { ReferenceComponent } from 'src/app/components/reference/reference.component';
import { Reference } from 'src/app/modals/refrence';
import { User } from 'src/app/modals/user';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(ProfileComponent) profileComponent: ProfileComponent;
  @ViewChild(ReferenceComponent) referenceComponent: ReferenceComponent;
  openReferenceOne: boolean = false;
  openReferenceTwo: boolean = false;
  userObj: User;
  referenceNo: number;
  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.userObj = this.dataService.user;
  }

  segmentChanged(event: CustomEvent) {
    this.dataService.activeSegment = event.detail.value;
    if (this.dataService.activeSegment === 'personal') {
      this.dataService.currentPage = 1;
      this.openReferenceOne = false;
      this.openReferenceTwo = false;
      this.dataService.isBasicDetailsFilled = false;
    } else if (this.dataService.activeSegment === 'business') {
      this.dataService.currentPage = 6;
    } else if (this.dataService.activeSegment === 'upload') {
      this.dataService.currentPage = 7;
    }
  }

  validatePersonDetails(): boolean {
    // if (!this.dataService.user.imgurl) {
    //   this.dataService.displayToast('Please upload your profile photo', 'WARNING');
    //   return false;
    // } 
    if (!this.userObj.prefix) {
      this.dataService.displayToast('Please select your title prefix', 'WARNING');
      return false;
    } 
    if (!this.userObj.physicallyChallenged) {
      this.dataService.displayToast('Please select if you are physically challenged', 'WARNING');
      return false;
    }
    if (!this.userObj.maritalStatus) {
      this.dataService.displayToast('Please select your marital status', 'WARNING');
      return false;
    } 
    if (!this.userObj.community) {
      this.dataService.displayToast('Please select your community', 'WARNING');
      return false;
    }
    if (!this.userObj.category) {
      this.dataService.displayToast('Please select your category', 'WARNING');
      return false;
    }
    if (!this.userObj.gender) {
      this.dataService.displayToast('Please select your gender', 'WARNING');
      return false;
    }
    return true;
  }

  goToNext(value: number) {
    switch (this.dataService.currentPage) {
      // Page 1: Profile Details
      case 1: {
        this.goToReferenceOne();
        break;
      }
      // Page 2: Reference 1 basice details
      case 2: {
        this.goToReferenceOneMore();
        break;
      }
      // Page 3: Reference 1 more details
      case 3: {
        this.gotToReferenceTwo();
        break
      }
      // Page 4: Reference 2 basice details
      case 4: {
        this.gotToReferenceTwoMore();
        break
      }
      // Page 5: Reference 2 more details
      case 5: {
        this.goToBusiness();
        break
      }
      // Page 6: Business Details
      case 6: {
        this.goToUploadDocs();
        break
      }
    }
  }
  submit() {
    console.log(JSON.stringify(this.dataService.user));
  }

  goBack(value: number) {
    switch (value) {
      // Page 7: Going back from Upload Docs
      case 7: {
        this.dataService.currentPage = 6;
        break
      }
      // Page 6: Going back from Business Details
      case 6: {
        this.dataService.currentPage = 5;
        this.openReferenceTwo = true;
        this.dataService.activeSegment = 'personal';
        this.dataService.isBasicDetailsFilled = true;
        break
      }
      // Page 5: Going back from Reference 2 more details
      case 5: {
        this.dataService.currentPage = 4;
        this.openReferenceTwo = true;
        this.dataService.activeSegment = 'personal';
        this.dataService.isBasicDetailsFilled = false;
        break
      }
      // Page 4 : Going back from Reference 2 basice details
      case 4: {
        this.dataService.currentPage = 3;
        this.openReferenceTwo = false;
        this.openReferenceOne = true;
        this.dataService.isBasicDetailsFilled = true;
        this.dataService.activeSegment = 'personal';
        break
      }
      // Page 3: Going back from Reference 1 more details
      case 3: {
        this.dataService.currentPage = 2;
        this.openReferenceOne = true;
        this.dataService.activeSegment = 'personal';
        this.dataService.isBasicDetailsFilled = false;
        break
      }
      // Page 2: Going back to Profile
      case 2: {
        this.dataService.currentPage = 1;
        this.openReferenceOne = false;
        this.dataService.activeSegment = 'personal';
        break;
      }
    }
  }

  goToReferenceOne() {
    if (this.validatePersonDetails()) {
      this.openReferenceOne = true;
      this.dataService.currentPage = 2;
    }
  }

  goToReferenceOneMore() {
    // if (this.referenceComponent.validateReferenceDetails()) {
      this.openReferenceOne = true;
      this.dataService.currentPage = 3;
      this.dataService.isBasicDetailsFilled = true;
    // }
  }

  gotToReferenceTwo() {
    // if (this.referenceComponent.validateReferenceDetails()) {
      this.referenceComponent.goNextForMoreDetails();
      this.dataService.isBasicDetailsFilled = false;
      this.openReferenceTwo = true;
      this.openReferenceOne = false;
      this.dataService.currentPage = 4;
    // }
  }

  gotToReferenceTwoMore() {
    // if (this.referenceComponent.validateReferenceDetails()) {
      this.dataService.isBasicDetailsFilled = true;
      this.openReferenceTwo = true;
      this.dataService.currentPage = 5;
    // }
  }
  goToBusiness() {
    // if (this.referenceComponent.validateReferenceDetails()) {
      this.referenceComponent.goNextForMoreDetails();
      this.openReferenceTwo = false;
      this.dataService.activeSegment = 'business';
      this.dataService.currentPage = 6;
    // }
  }

  goToUploadDocs() {
    this.dataService.activeSegment = 'upload';
    this.dataService.currentPage = 7;
  }


  goToProfile() {
    this.dataService.currentPage = 1;
    this.dataService.activeSegment = 'personal';
  }


}
