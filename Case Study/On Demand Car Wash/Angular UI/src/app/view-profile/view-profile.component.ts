import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  profileEmail="";
  otherProfile:any = {};
  customers:any;
  profileData:any = {};
  isAdmin = false;

  imgMimeType = ['image.jpeg','image/png'];
  selectedPicture:any;
  profileImage:any;
  secondReader: any;

  constructor(private auth:AuthService, private route:Router,private http:HttpClient,private router:ActivatedRoute) { }

  ngOnInit(): void {
    const otherEmail = this.router.snapshot.paramMap.get('id');
    this.auth.verifyUser().subscribe(data=>{
      this.profileEmail=data.toString();
      this.http.get("http://localhost:3000/viewAllCustomers").subscribe(data=>{this.customers=data;console.log(data);
      this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{this.profileData=data;console.log(data);
      this.http.post("http://localhost:3000/user",{"email":otherEmail}).subscribe((data)=>this.otherProfile = data,(err)=>console.log(err));
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

  editProfile(){
    this.route.navigate(['/dashboard/editProfile',this.otherProfile.email]);
  }

}
