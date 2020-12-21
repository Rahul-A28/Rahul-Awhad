import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { WasherOrdersComponent } from './washer-orders/washer-orders.component';
import { AvailableOrdersComponent } from './available-orders/available-orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { ViewWashersComponent } from './view-washers/view-washers.component';
import { ViewAllOrdersComponent } from './view-all-orders/view-all-orders.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AssignOrderComponent } from './assign-order/assign-order.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'signUp',component:SignUpComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'dashboard/profile',component:ProfileComponent},
  {path:'dashboard/placeOrder',component:PlaceOrderComponent},
  {path:'dashboard/myOrders',component:MyOrdersComponent},
  {path:'dashboard/washerOrders',component:WasherOrdersComponent},
  {path:'dashboard/availableOrders',component:AvailableOrdersComponent},
  {path:'dashboard/viewOrder/:orderId',component:ViewOrderComponent},
  {path:'dashboard/viewCustomers',component:ViewCustomersComponent},
  {path:'dashboard/viewWashers',component:ViewWashersComponent},
  {path:'dashboard/viewAllOrders',component:ViewAllOrdersComponent},
  {path:'dashboard/viewProfile/:id',component:ViewProfileComponent},
  {path:'dashboard/editProfile/:id',component:EditProfileComponent},
  {path:'dashboard/viewAllOrders',component:ViewAllOrdersComponent},
  {path:'dashboard/assignOrder/:orderId',component:AssignOrderComponent},
  {path:'home',component:HomeComponent},
  {path:'services',component:ServicesComponent},
  {path:'contact',component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
