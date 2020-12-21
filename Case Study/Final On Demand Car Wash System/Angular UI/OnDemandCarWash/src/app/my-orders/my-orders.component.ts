import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  profileEmail = "";
  myOrders:any;
  profileData:any={};
  isWasher = false;

  isPending = false;
  isAccepted = true;
  isInProgress = false;
  isCompleted = false;
  
  



  constructor(private http:HttpClient, private route:Router, private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.verifyUser().subscribe(data=>{
      this.profileEmail=data.toString();
      this.http.post("http://localhost:3002/myOrders",{"email":this.profileEmail}).subscribe(data=>{this.myOrders=data;console.log(data);
      this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{this.profileData=data;console.log(data)},err=>console.log("Error Retrieving Data"));
      if(this.profileData.type=="Washer"){
        this.isWasher = true;
        console.log("Washer is true")
      }
    },
    err=>console.log("Error Retrieving Data"));
    },err=>this.route.navigate(['/login']));
  }

  isPendingg(){
    
    
    this.isPending = true;
    
    this.isAccepted = false;
    this.isInProgress = false;
    this.isCompleted = false;
    
  }

  isAcceptedd(){
    
    this.isPending = false;
    this.isAccepted = true;
    
    this.isInProgress = false;
    this.isCompleted = false;
    
  }

  isInProgresss(){
    
    this.isPending = false;
    this.isAccepted = false;
    this.isInProgress = true;
    
    this.isCompleted = false;
    
  }

  isCompletedd(){
    
    this.isPending = false;
    this.isAccepted = false;
    this.isInProgress = false;
    this.isCompleted = true;
    
    
  }

  viewOrder(id:any){
    console.log(id);
    this.route.navigate(['dashboard/viewOrder',id]);

  }

}
