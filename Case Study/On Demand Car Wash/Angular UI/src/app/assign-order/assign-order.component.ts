import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-assign-order',
  templateUrl: './assign-order.component.html',
  styleUrls: ['./assign-order.component.css']
})
export class AssignOrderComponent implements OnInit {

  profileEmail="";
  otherProfile:any = {};
  customers:any;
  profileData:any = {};
  isAdmin = false;

  imgMimeType = ['image.jpeg','image/png'];
  selectedPicture:any;
  profileImage:any;
  secondReader: any;
  displayOrder:any = {};
  washers:any = [];

  constructor(private auth:AuthService, private route:Router,private http:HttpClient,private router:ActivatedRoute) { }

  ngOnInit(): void {
    const orderId = this.router.snapshot.paramMap.get('orderId');
    this.auth.verifyUser().subscribe(data=>{
      this.profileEmail=data.toString();
      this.http.post("http://localhost:3002/order",{_id:orderId}).subscribe(data=>{this.displayOrder=data;console.log(data);
      this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{this.profileData=data;console.log(data);
      this.http.get("http://localhost:3000/viewAllWashers").subscribe((data)=>this.washers = data,(err)=>console.log(err));
      if(this.profileData.type=="Admin"){
        this.isAdmin = true;
        console.log("Admin is true");
      }
      else{
        this.route.navigate(['/dashboard']);
      };
      
    },err=>console.log("Error Retrieving Data"));
      
    },
    err=>console.log("Error Retrieving Data"));
    },err=>this.route.navigate(['/login']));
  }

  assignOrder(washer:any){
    const orderId = this.displayOrder._id;
    const email = washer.email;
    const name = washer.firstName + " " +this.profileData.lastName;
    const phone = washer.phone;
    const isAcceptedDate = new Date().toLocaleString('en-GB', { timeZone: 'IST' });
    this.http.post("http://localhost:3002/acceptOrder",{orderId:orderId,email:email,name:name,phone:phone,isAcceptedDate:isAcceptedDate})
    .subscribe((data)=>{console.log(data);alert("Successfully Accepted Order");this.route.navigate(['/dashboard'])},(err=>console.log(err)));
  }

}
