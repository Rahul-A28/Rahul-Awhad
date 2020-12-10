import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileEmail="";
  profileData:any = {};
  reqe:object={};
  imgMimeType = ['image.jpeg','image/png'];
  selectedPicture:any;
  profileImage:any;
  secondReader: any;

  constructor(private auth:AuthService, private route:Router,private http:HttpClient) {
    
   }

 
  ngOnInit(): void {
    // this.auth.verifyUser().subscribe(data=>{this.profileEmail=data;console.log(this.profileEmail+" Email")},err=>this.route.navigate(['/login']));
    
    this.auth.verifyUser().subscribe(data=>{
      this.profileEmail=data.toString();
      this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{this.profileData=data;console.log(data)},err=>console.log("Error Retrieving Data"));
    },err=>this.route.navigate(['/login']));
    
    
  }

  onFileSelect(event:any,formValue:any){
    // console.log(event)
    this.selectedPicture = <File>event.target.files[0];
    let file = event.target.files[0];
   let reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function (event:any) {
     //me.modelvalue = reader.result;
    //  console.log(reader.result);
    
     
   };
   this.secondReader = reader;
  
  
  }


  updatePicture(img:any){

    //console.log(this.secondReader.result);
    

    if(this.selectedPicture ){
      if(this.selectedPicture.size/(1024*1024)<1){
        // const fd = new FormData();
        // fd.append('image',this.selectedPicture, this.selectedPicture.name);
        this.http.post('http://localhost:3000/addPhoto',{email:this.profileData.email,profileImg:this.secondReader.result}).subscribe(data=>{console.log(data);this.ngOnInit()},err=>console.log(err));
        
      }
      else{
        alert(this.selectedPicture.size/(1024*1024));
      }  
    }
    else{
      alert("Select a Picture First");
    }

    

    // const image = JSON.parse(img.profileImg);
    
    // if(image != null && this.imgMimeType.includes(image.type)){
      
    //   const email = this.profileData.email;
    //   //const imageBuffer = new Buffer.from(image.data,'base64');
    //   console.log(typeof(image.data));

    // }
    // else{
    //   alert("Image should be in either jpeg or png format");
      
    // }
  }


 

}
