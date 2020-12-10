import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AuthService } from './auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashNavComponent } from './dash-nav/dash-nav.component';
import { ProfileComponent } from './profile/profile.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { WasherOrdersComponent } from './washer-orders/washer-orders.component';
import { AvailableOrdersComponent } from './available-orders/available-orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { ViewWashersComponent } from './view-washers/view-washers.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewAllOrdersComponent } from './view-all-orders/view-all-orders.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { AssignOrderComponent } from './assign-order/assign-order.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    SideBarComponent,
    DashboardComponent,
    DashNavComponent,
    ProfileComponent,
    PlaceOrderComponent,
    MyOrdersComponent,
    WasherOrdersComponent,
    AvailableOrdersComponent,
    ViewOrderComponent,
    ViewCustomersComponent,
    ViewWashersComponent,
    EditProfileComponent,
    ViewAllOrdersComponent,
    ViewProfileComponent,
    AssignOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
