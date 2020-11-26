import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { DataService } from '../data.service';
import { EditItemComponent } from './edit-item/edit-item.component';



@NgModule({
  declarations: [MenuComponent, EditItemComponent],
  imports: [
    CommonModule
  ],
  exports:[
    MenuComponent
  ],
  providers: [DataService]
})
export class MenuModule { }
