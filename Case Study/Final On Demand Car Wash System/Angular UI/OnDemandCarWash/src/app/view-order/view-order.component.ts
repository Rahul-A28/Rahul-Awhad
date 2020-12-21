import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare const L:any;
declare const Alert:any;

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

  lat:Number = 0;
  lng:Number = 0;
  marker:any;

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
      this.lat = this.profileData.geometry.coordinates[0];
        this.lng = this.profileData.geometry.coordinates[1];
        var mymap = L.map('mapid3').setView([this.lat,this.lng], 15);
        this.marker = L.marker([this.profileData.geometry.coordinates[0], this.profileData.geometry.coordinates[1]]).addTo(mymap);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFodWxtYXBib3gxIiwiYSI6ImNraWw1NDN0azBldzcydnBkaGJrNmxpYnMifQ.QLEo1Eg9y7GklM6RzZJxrg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
        }).addTo(mymap);
      console.log(data);
      
    
    
    },err=>console.log("Error Retrieving Data"));
      
      
    },
    err=>console.log("Error Retrieving Data"));
    },err=>this.route.navigate(['/login']));

    
    
  }

  startCleaning(id:any){

    this.http.post("http://localhost:3002/startCleaning",{orderId:id})
    .subscribe((data)=>{console.log(data);Alert.render("You are Now Cleaning the Car");this.ngOnInit()},(err=>console.log(err)));
  }

  markComplete(id:any){
    const date = new Date().toLocaleString('en-GB', { timeZone: 'IST' });
    this.http.post("http://localhost:3002/finishCleaning",{orderId:id,isCompleteDate:date,custId:this.displayOrder.custId})
    .subscribe((data)=>{console.log(data);Alert.render("Good Job !!! You Completed This Order");this.ngOnInit()},(err=>console.log(err)));
  }

  assignOrder(){
    this.route.navigate(['/dashboard/assignOrder',this.displayOrder._id]);
  }

}


