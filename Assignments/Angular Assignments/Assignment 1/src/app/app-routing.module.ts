import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin-component/admin-component.component';
import { RestaurantComponent } from './restaurant/restaurant/restaurant.component';
import { MenuComponent } from './menu/menu/menu.component';
import { EditRestaurantComponent } from './restaurant/edit-restaurant/edit-restaurant.component';
import { EditItemComponent } from './menu/edit-item/edit-item.component';

const routes: Routes = [
  {path:'Admin',component:RestaurantComponent},
  {path:'Admin/Restaurant/Menu/:name',component:MenuComponent},
  {path:'Admin/Restaurant/EditName/:name',component:EditRestaurantComponent},
  {path:'Admin/Restaurant/Menu/:name/:itemName',component:EditItemComponent},
  {path:'User',component:RestaurantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
