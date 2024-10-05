import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent  implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit() {
    console.log('business component')
  }

  editAddress() {

  }

}
