import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isAdmin:boolean = false;

  constructor(private _dataService: DataService,private route:ActivatedRoute,private route2:Router) { }

  data: Array<any> = [];
  restaurantName:any;
  requiredMenu: Array<any> = [];
  confirm:boolean = false;
  sum:number=0;

  ngOnInit(): void {
    this.isAdmin = this._dataService.isAdmin;
    this.data = this._dataService.getData(); 
    this.restaurantName = this.route.snapshot.paramMap.get('name');
    for(let restaurant of this.data){
      if(restaurant.rname==this.restaurantName){
        this.requiredMenu = restaurant.menu;
      }
    }
  }

  addMenu(resName:any,itemName:any,price:any){
    this._dataService.addMenu(resName,itemName,price);
  }

  
  deleteMenuItem(resName:any,itemName:any){
    this._dataService.deleteMenuItem(resName,itemName);
  }
  
  editItem(resName:any,itemName:any){
    this.route2.navigate(['Admin/Restaurant/Menu',resName,itemName]);
  }

  getSelectedItems(){
    this.sum = 0;
    let selectedItems = Array.from(document.querySelectorAll('.selectedItems'));
    for(let i of selectedItems){
      if((<HTMLInputElement>i).checked){
        this.sum += parseInt((<HTMLInputElement>i).value);
      }
    }
    this.confirm = true;
    console.log(this.sum);
  }
  
  orderSuccess(){
    alert("Order is Placed");
    this.route2.navigate(['/']);
  }
  orderFailed(){
    alert("Order is not Placed");
    this.route2.navigate(['/']);
  }

}
