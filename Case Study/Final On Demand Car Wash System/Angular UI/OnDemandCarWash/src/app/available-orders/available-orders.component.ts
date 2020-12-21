import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare const Alert:any;

@Component({
  selector: 'app-available-orders',
  templateUrl: './available-orders.component.html',
  styleUrls: ['./available-orders.component.css']
})
export class AvailableOrdersComponent implements OnInit {
  profileEmail: string = "";
  profileData: any = {};
  isWasher: boolean = false;
  availableOrders: any = [];
  isAdmin = false;
  

  constructor(private http:HttpClient, private route:Router, private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.verifyUser().subscribe(data=>{
      this.profileEmail=data.toString();
      this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{
        this.profileData=data;
        console.log(data);
        if(this.profileData.type=="Washer"){
          this.isWasher = true;
          this.http.post("http://localhost:3002/washerAvailableOrders",{lat:this.profileData.geometry.coordinates[0],lng:this.profileData.geometry.coordinates[1]}).subscribe((data)=>{this.availableOrders=data;console.log(data)},(err)=>console.log(err));
        }
        else if(this.profileData.type=="Admin"){
          this.isAdmin = true;
          this.http.get("http://localhost:3002/getAvailableOrders").subscribe(data=>this.availableOrders=data,err=>console.log(err));
        }
      });
    },err=>this.route.navigate(['/login']));

  }

  acceptOrder(order:any){
    const orderId = order._id;
    const email = this.profileData.email;
    const name = this.profileData.firstName + " " +this.profileData.lastName;
    const phone = this.profileData.phone;
    const isAcceptedDate = new Date().toLocaleString('en-GB', { timeZone: 'IST' });
    this.http.post("http://localhost:3002/acceptOrder",{orderId:orderId,email:email,name:name,phone:phone,isAcceptedDate:isAcceptedDate})
    .subscribe((data)=>{console.log(data);Alert.render("Successfully Accepted Order");this.route.navigate(['/dashboard'])},(err=>console.log(err)));
  }

  assignOrder(order:any){
    this.route.navigate(['/dashboard/assignOrder',order._id]);
  }

}
