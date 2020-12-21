import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';

declare const Alert:any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileEmail="";
  otherProfile:any = {};
  customers:any;
  profileData:any = {};
  isAdmin = false;

  imgMimeType = ['image.jpeg','image/png'];
  selectedPicture:any;
  profileImage:any;
  secondReader: any;
  dateValue = "";

  firstNAME="";

  constructor(private auth:AuthService, private route:Router,private http:HttpClient,private router:ActivatedRoute) { }

  ngOnInit(): void {
    const otherEmail = this.router.snapshot.paramMap.get('id');
    this.auth.verifyUser().subscribe(data=>{
      this.profileEmail=data.toString();
      this.http.get("http://localhost:3000/viewAllCustomers").subscribe(data=>{this.customers=data;console.log(data);
      this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{this.profileData=data;console.log(data);
      this.http.post("http://localhost:3000/user",{"email":otherEmail}).subscribe((data)=>{
        this.otherProfile = data;
        
        this.dateValue = this.otherProfile.dob;
    },(err)=>console.log(err));
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

  onFileSelect(event:any,formValue:any){
    
    this.selectedPicture = <File>event.target.files[0];
    let file = event.target.files[0];
   let reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function (event:any) {
    
    
     
   };
   this.secondReader = reader;
  
  
  }


  updatePicture(img:any){

    
    

    if(this.selectedPicture ){
      if(this.selectedPicture.size/(1024*1024)<1){
        
        this.http.post('http://localhost:3000/addPhoto',{email:this.profileData.email,profileImg:this.secondReader.result}).subscribe(data=>{console.log(data);this.ngOnInit()},err=>console.log(err));
        
      }
      else{
        
        Alert.render("Image Size Should br Below 1 MB !");
      }  
    }
    else{
      
      Alert.render("Select a Picture First");
    }

  }

  saveProfile(saveData:any){
    saveData.email = this.otherProfile.email;
    console.log(saveData);
    this.http.post('http://localhost:3000/saveProfile',saveData).subscribe((data)=>{Alert.render("Updated Successfully");this.route.navigate(["/dashboard/viewProfile",this.otherProfile.email])},err=>Alert.render("Something Went Wrong"));
  }

  cancel(){
    this.route.navigate(["/dashboard/viewProfile",this.otherProfile.email]);

  }


}
