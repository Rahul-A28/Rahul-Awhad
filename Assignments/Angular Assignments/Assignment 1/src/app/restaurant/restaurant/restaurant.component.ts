import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  public resdata: Array<any> = [];
  public isAdmin:boolean = false;
  

  constructor(private _dataService: DataService,private router: Router) { }

  ngOnInit(): void {
    this.resdata = this._dataService.getData();
    this.isAdmin = this._dataService.isAdmin;
  }

  



  addRestaurant(value:string){
    console.log(value);
    this._dataService.addRestaurant(value);
  }

  toMenu(name:string){
    this.router.navigate(['/Admin/Restaurant/Menu',name]);
  }

  deleteRestaurant(name:any){
    this._dataService.deleteRestaurant(name);
  }

  editRestaurantName(resname:any){
    this.router.navigate(['/Admin/Restaurant/EditName',resname]);

  }


}
