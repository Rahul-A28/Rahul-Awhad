import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
// import { FormsModule } from '@angular/forms' ;
// import { NgForm } from '@angular/forms';
// import { NgModule } from '@angular/core';


declare const Razorpay:any;


@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  static ROUTE_SERVICE: Router;
  static HTTP_SERVICE: HttpClient;
  
  static orderData:any;
  static ZONE_SERVICE: NgZone;

  

  constructor(private auth:AuthService, public route:Router,private http:HttpClient,private zone: NgZone) {
    PlaceOrderComponent.ROUTE_SERVICE = this.route;
    PlaceOrderComponent.HTTP_SERVICE = this.http;
    PlaceOrderComponent.ZONE_SERVICE = this.zone;
   }

  

  profileEmail = "";
  profileData:any = {};
  Razorpay:any;
  razorPayOptions:any = {
    "key":'',
    "amount":'',
    "currency":"INR",
    "name":"",
    "description":"Washer Order Payment",
    "order_id":"",
    "handler": function(res:any){
      console.log(res);
      // PlaceOrderComponent.ROUTE_SERVICE.navigate(['/dashboard']);
    }
  };

  

  

  ngOnInit(): void {
    this.auth.verifyUser().subscribe(data=>{
      this.profileEmail=data.toString();
      this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{
        this.profileData=data;
        if(this.profileData.type=="Washer"){
          this.route.navigate(['/dashboard']);
        }
        console.log(data)},
        err=>console.log("Error Retrieving Data"));
    },err=>this.route.navigate(['/login']));
  };

  submitOrder(formData:any){
    const [packageName, packagePrice] = formData.package.split(" ");
    const custId = this.profileData.email;
    const custName = this.profileData.firstName + " " + this.profileData.lastName;
    const carLocation = formData.street + ", " + formData.city + ", " + formData.state;
    const carPlateNo = formData.carPlateNo;
    const custPhoneNo = this.profileData.phone;
    const orderPosted = new Date().toLocaleString('en-GB', { timeZone: 'IST' });
    PlaceOrderComponent.orderData = {custId:custId,custName:custName,carLocation:carLocation,carPlateNo:carPlateNo,custPhoneNo:custPhoneNo,packageName:packageName,packagePrice:packagePrice,orderPosted:orderPosted};
    console.log("Package Price: "+packagePrice);
    this.http.post("http://localhost:3002/razorPayOrder",{amount:packagePrice,orderData:PlaceOrderComponent.orderData}).subscribe((data:any)=>{
      console.log(data);
      this.razorPayOptions.key = data.key;
      this.razorPayOptions.amount = data.value.amount;
      this.razorPayOptions.name = custName;
      this.razorPayOptions.order_id = data.value.id;
      this.razorPayOptions.handler = this.razorPayResponseHandler;
      const rzp1 = new Razorpay(this.razorPayOptions);
      rzp1.open();
      console.log("Opened");
    },
    (err)=>console.log(err));
  }

  razorPayResponseHandler(response:any) {
    
    console.log(response);
    alert("Payment Successfull");
    // this.route.navigate(['/dashboard']);
    // const orderData = {custId:custId,custName:custName,carLocation:carLocation,carPlateNo:carPlateNo,custPhoneNo:custPhoneNo,packageName:packageName,packagePrice:packagePrice};
    PlaceOrderComponent.HTTP_SERVICE.post("http://localhost:3002/newOrder",PlaceOrderComponent.orderData).subscribe((data)=>{console.log(data);alert("Also Updated the Database");PlaceOrderComponent.ZONE_SERVICE.run(()=>PlaceOrderComponent.ROUTE_SERVICE.navigate(['/dashboard']))},(err)=>console.log(err));
  }


}


// submitOrder(formData:any){
//   const [packageName, packagePrice] = formData.package.split(" ");
//   const custId = this.profileData.email;
//   const custName = this.profileData.firstName + " " + this.profileData.lastName;
//   const carLocation = formData.street + ", " + formData.city + ", " + formData.state;
//   const carPlateNo = formData.carPlateNo;
//   const custPhoneNo = this.profileData.phone;
//   const orderData = {custId:custId,custName:custName,carLocation:carLocation,carPlateNo:carPlateNo,custPhoneNo:custPhoneNo,packageName:packageName,packagePrice:packagePrice};
//   this.http.post("http://localhost:3002/newOrder",orderData).subscribe((data)=>{console.log(data);alert("Order Submitted");this.route.navigate(['/dashboard'])},(err)=>console.log(err));
// }