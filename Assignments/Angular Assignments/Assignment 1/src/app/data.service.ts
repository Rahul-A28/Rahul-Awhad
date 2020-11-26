import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class DataService {

  data = [
    {rname:"MasalaPalace",
     menu:[{name:"Burger",price:100},{name:"pizza",price:101}]
  },
  {rname:"FoodPalace",
     menu:[{name:"Frankie",price:103},{name:"Momo",price:104}]
  }
  ];

  isAdmin:boolean = false;

  constructor(private router: Router) { }

  public addRestaurant(name:string){
    this.data.push({rname:name,menu:[]});
  }

  public getData(){
    return this.data;
  }

  public addMenu(resName:any,itemName:any,price:any){
    for(let restaurant of this.data){
      if(restaurant.rname==resName){
        restaurant.menu.push({name:itemName,price:price});
      }
    }
  }


  public deleteRestaurant(resname:any){
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].rname==resname){
        this.data.splice(i,i+1);
      }
    }
  }

  public deleteMenuItem(resName:any,itemName:any){
    for(let restaurant of this.data){
      if(restaurant.rname==resName){
        for(let k=0;k<restaurant.menu.length;k++){
          if(restaurant.menu[k].name==itemName){
            restaurant.menu.splice(k,k+1);
          }
        }
      }
    }
  }

  public updateRestaurantName(resName:any,newName:any){
    for(let restaurant of this.data){
      if(restaurant.rname==resName){
        restaurant.rname = newName;
        alert("Name Changed Successfully");
        this.router.navigate(['/Admin']);
      }
    }
  }

  public editItem(resName:any,oldItem:any,newItem:any,newPrice:any){
    for(let restaurant of this.data){
      if(restaurant.rname==resName){
        for(let k=0;k<restaurant.menu.length;k++){
          if(restaurant.menu[k].name==oldItem){
            restaurant.menu[k].name=newItem;
            restaurant.menu[k].price=newPrice;
          }
        }
      }
    }
    alert("Updated Successfully");
    this.router.navigate(['/Admin']);
  }

  checkAdmin(who:string){
    if(who=="Admin"){
      this.isAdmin = true;
    }
    else{
      this.isAdmin = false;
    }
  }


}
