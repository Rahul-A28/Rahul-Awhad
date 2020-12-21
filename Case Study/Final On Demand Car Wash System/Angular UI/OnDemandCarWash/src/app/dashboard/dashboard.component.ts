import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId = "";
  profileEmail="";
  myOrders:any = {};
  profileData:any = {};
  isWasher = false;
  isAdmin = false;
  isCustomer = false;
  constructor(private auth:AuthService, private route:Router,private http:HttpClient) {
    
   }

  ngOnInit(): void {
    this.auth.verifyUser().subscribe(data=>{
      this.profileEmail=data.toString();
      this.http.post("http://localhost:3002/myOrders",{"email":this.profileEmail}).subscribe(data=>{this.myOrders=data;console.log(data);
      this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{this.profileData=data;console.log(data);
      if(this.profileData.type=="Washer"){
        this.isWasher = true;
        console.log("Washer is true")
      }
      else if(this.profileData.type=="Customer"){
        this.isCustomer = true;
        console.log("Customer is true")
      }
      else if(this.profileData.type=="Admin"){
        this.isAdmin = true;
        console.log("Admin is true");
      }
    },err=>console.log("Error Retrieving Data"));
      
    },
    err=>console.log("Error Retrieving Data"));
    },err=>this.route.navigate(['/login']));
    
  }

}
