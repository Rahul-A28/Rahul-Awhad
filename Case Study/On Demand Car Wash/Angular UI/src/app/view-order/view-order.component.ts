import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  profileEmail: string = "";
  myOrders: any = {};
  profileData: any = {};
  isWasher = false;
  displayOrder:any = {};
  orderId:any;
  isAdmin = false;

  constructor(private auth:AuthService, private route:Router,private http:HttpClient,private actRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.auth.verifyUser().subscribe(data=>{
      this.orderId = this.actRoute.snapshot.paramMap.get('orderId');
      console.log("This is Order Id: "+ this.orderId);
      this.profileEmail=data.toString();
      this.http.post("http://localhost:3002/order",{_id:this.orderId}).subscribe(data=>{this.displayOrder=data;console.log(data);
      
      this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{this.profileData=data;
      this.isWasher = this.profileData.type=="Washer";
      this.isAdmin = this.profileData.type=="Admin";
      console.log(data);
      
    
    
    },err=>console.log("Error Retrieving Data"));
      
      
    },
    err=>console.log("Error Retrieving Data"));
    },err=>this.route.navigate(['/login']));

    
    
  }

  startCleaning(id:any){

    this.http.post("http://localhost:3002/startCleaning",{orderId:id})
    .subscribe((data)=>{console.log(data);alert("You are Now Cleaning the Car");this.ngOnInit()},(err=>console.log(err)));
  }

  markComplete(id:any){
    const date = new Date().toLocaleString('en-GB', { timeZone: 'IST' });
    this.http.post("http://localhost:3002/finishCleaning",{orderId:id,isCompleteDate:date})
    .subscribe((data)=>{console.log(data);alert("Good Job !!! You Completed This Order");this.ngOnInit()},(err=>console.log(err)));
  }

  assignOrder(){
    this.route.navigate(['/dashboard/assignOrder',this.displayOrder._id]);
  }

}


// ngOnInit(): void {

//   this.auth.verifyUser().subscribe(data=>{
//     this.orderId = this.actRoute.snapshot.paramMap.get('orderId');
//     console.log("This is Order Id: "+ this.orderId);
//     this.profileEmail=data.toString();
//     this.http.post("http://localhost:3002/washerOrders",{"email":this.profileEmail}).subscribe(data=>{this.myOrders=data;console.log(data);
//     for(let order of this.myOrders){
//       if(order._id==this.orderId){
//         this.displayOrder = order;
//         console.log("Here is the Display Order");
//         console.log(this.displayOrder);
//       }
//     }
//     this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{this.profileData=data;this.isWasher = this.profileData.type=="Washer";console.log(data)},err=>console.log("Error Retrieving Data"));
    
//     if(this.profileData.type=="Washer"){
//       this.isWasher = true;
//       console.log("Washer is true")
//     }
//   },
//   err=>console.log("Error Retrieving Data"));
//   },err=>this.route.navigate(['/login']));

  
  
// }