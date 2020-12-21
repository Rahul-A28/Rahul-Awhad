import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-view-washers',
  templateUrl: './view-washers.component.html',
  styleUrls: ['./view-washers.component.css']
})
export class ViewWashersComponent implements OnInit {

  userId = "";
  profileEmail="";
  
  washers:any;
  profileData:any = {};
  isAdmin = false;

  constructor(private auth:AuthService, private route:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.auth.verifyUser().subscribe(data=>{
      this.profileEmail=data.toString();
      this.http.get("http://localhost:3000/viewAllWashers").subscribe(data=>{this.washers=data;console.log(data);
      this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{this.profileData=data;console.log(data);
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


  viewWasher(washer:any){
    this.route.navigate(['/dashboard/viewProfile',washer.email]);
  }

}
