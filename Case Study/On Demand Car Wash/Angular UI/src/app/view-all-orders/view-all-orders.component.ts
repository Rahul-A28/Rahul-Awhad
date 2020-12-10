import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-view-all-orders',
  templateUrl: './view-all-orders.component.html',
  styleUrls: ['./view-all-orders.component.css']
})
export class ViewAllOrdersComponent implements OnInit {

  profileEmail: string = "";
  myOrders: any = {};
  profileData: any = {};
  isAdmin = false;
  allOrders:any = [];
  orderId:any;

  constructor(private auth:AuthService, private route:Router,private http:HttpClient,private actRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.auth.verifyUser().subscribe(data=>{
      this.orderId = this.actRoute.snapshot.paramMap.get('orderId');
      console.log("This is Order Id: "+ this.orderId);
      this.profileEmail=data.toString();
      this.http.get("http://localhost:3002/getAllOrders").subscribe(data=>{this.allOrders=data;console.log(data);
      
      this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{this.profileData=data;this.isAdmin = this.profileData.type=="Admin";
      console.log(this.profileData.type=="Admin");
      if(this.profileData.type=="Admin"){
        this.isAdmin = true;
        console.log("Admin is true");
      }
      else{
        this.route.navigate(['/dashboard']);
      }
    },err=>console.log("Error Retrieving Data"));
      
      
    },
    err=>console.log("Error Retrieving Data"));
    },err=>this.route.navigate(['/login']));

  }

  viewOrder(id:any){
    console.log(id);
    this.route.navigate(['dashboard/viewOrder',id]);

  }

}
