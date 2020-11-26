import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { AdminComponent } from './admin/admin-component/admin-component.component'
import { AdminModule } from './admin/admin.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MenuModule } from './menu/menu.module';
import { DataService } from './data.service';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    RestaurantModule,
    MenuModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
