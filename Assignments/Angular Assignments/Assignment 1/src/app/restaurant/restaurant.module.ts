import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../admin/admin-component/admin-component.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { DataService } from '../data.service';
import { AdminModule } from '../admin/admin.module';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';



@NgModule({
  declarations: [RestaurantComponent, EditRestaurantComponent],
  imports: [
    CommonModule,
    AdminModule
  ],
  exports:[
    RestaurantComponent
  ],
  providers: [DataService]
})
export class RestaurantModule { }
