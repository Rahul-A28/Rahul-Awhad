import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-washer-orders',
  templateUrl: './washer-orders.component.html',
  styleUrls: ['./washer-orders.component.css']
})
export class WasherOrdersComponent implements OnInit {

  profileEmail="";
  myOrders:any = {};
  profileData:any = {};
  isWasher = false;

  constructor(private auth:AuthService, private route:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.auth.verifyUser().subscribe(data=>{
      this.profileEmail=data.toString();
      this.http.post("http://localhost:3002/washerOrders",{"email":this.profileEmail}).subscribe(data=>{this.myOrders=data;console.log(data);
      this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{this.profileData=data;console.log(data)},err=>console.log("Error Retrieving Data"));
      
      if(this.profileData.type=="Washer"){
        this.isWasher = true;
        console.log("Washer is true")
      }
    },
    err=>console.log("Error Retrieving Data"));
    },err=>this.route.navigate(['/login']));
  }

  viewOrder(id:any){
    console.log(id);
    this.route.navigate(['dashboard/viewOrder',id]);

  }


}
