import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin-component/admin-component.component';
import { DataService } from '../data.service';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule
  ],
  exports:[
    AdminComponent
  ],
  providers: [DataService]
})
export class AdminModule { }
