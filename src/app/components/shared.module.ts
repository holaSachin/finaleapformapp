import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BusinessComponent } from 'src/app/components/business/business.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { ReferenceComponent } from 'src/app/components/reference/reference.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploaddocumnetsComponent } from 'src/app/components/uploaddocumnets/uploaddocumnets.component';
import { CapitalizeFirstPipe } from '../capitalize-first.pipe'; 
@NgModule({
  declarations: [
    BusinessComponent,
    ProfileComponent,
    ReferenceComponent,
    UploaddocumnetsComponent,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule,CapitalizeFirstPipe],
  exports: [
    BusinessComponent,
    ProfileComponent,
    ReferenceComponent,
    UploaddocumnetsComponent,
  ],
})
export class SharedModule {}
