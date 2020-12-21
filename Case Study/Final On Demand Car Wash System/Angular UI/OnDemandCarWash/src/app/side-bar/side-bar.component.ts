import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  profileEmail="";
  profileData:any = {};
  isWasher = false;
  isAdmin = false;
  constructor(private auth:AuthService, private route:Router,private http:HttpClient) { }

  ngOnInit(): void {

    this.auth.verifyUser().subscribe(data=>{
      this.profileEmail=data.toString();
      this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{this.profileData=data;this.isWasher = this.profileData.type=="Washer";
      this.isAdmin = this.profileData.type == "Admin";
      console.log(data)},err=>console.log("Error Retrieving Data"));
    },err=>this.route.navigate(['/login']));

  }

}
