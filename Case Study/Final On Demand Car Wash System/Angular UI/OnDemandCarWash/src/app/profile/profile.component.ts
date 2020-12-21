import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


declare let L:any;

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

  lat:Number = 0;
  lng:Number = 0;
  marker:any;

  isEdit = false;

  constructor(private auth:AuthService, private route:Router,private http:HttpClient) {
    
   }

 
  ngOnInit(): void {
    // this.auth.verifyUser().subscribe(data=>{this.profileEmail=data;console.log(this.profileEmail+" Email")},err=>this.route.navigate(['/login']));
    
    this.auth.verifyUser().subscribe(data=>{
      this.profileEmail=data.toString();
      this.http.post("http://localhost:3000/user",{"email":this.profileEmail}).subscribe(data=>{
        this.profileData=data;
        console.log(data);
        this.lat = this.profileData.geometry.coordinates[0];
        this.lng = this.profileData.geometry.coordinates[1];
        var mymap = L.map('mapid1').setView([this.lat,this.lng], 15);
        this.marker = L.marker([this.profileData.geometry.coordinates[0], this.profileData.geometry.coordinates[1]]).addTo(mymap);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFodWxtYXBib3gxIiwiYSI6ImNraWw1NDN0azBldzcydnBkaGJrNmxpYnMifQ.QLEo1Eg9y7GklM6RzZJxrg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
        }).addTo(mymap);
    
        const onMapClick = (e:any) =>{
        console.log(e.latlng);
        if(this.isEdit){  
          this.lat=e.latlng.lat;
          this.lng=e.latlng.lng;
          var lati = (e.latlng.lat);
          var lngi = (e.latlng.lng);
          var newLatLng = new L.LatLng(lati, lngi);
          this.marker.setLatLng(newLatLng);
        }  
      
  }
  
    mymap.on('click', onMapClick);


    },err=>console.log("Error Retrieving Data"));
    },err=>this.route.navigate(['/login']));
    
    
    
  }

  onFileSelect(event:any,formValue:any){
    // console.log(event)
    this.selectedPicture = <File>event.target.files[0];
    let file = event.target.files[0];
   let reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function (event:any) {
    
    
     
   };
   this.secondReader = reader;
  
  
  }

  editCord(){
    this.isEdit = true;
  }

saveCord(){
    const email = this.profileData.email;
    const geometry = {type:"point",coordinates:[this.lat,this.lng]};
    this.http.post("http://localhost:3000/updateCords",{email:email,geometry:geometry}).subscribe(data=>{this.isEdit=false;alert("Updates Latitude and Longitude Successfully");this.ngOnInit()},err=>alert("Failed to Update"));
}


  updatePicture(img:any){

    
    

    if(this.selectedPicture ){
      if(this.selectedPicture.size/(1024*1024)<1){
        
        this.http.post('http://localhost:3000/addPhoto',{email:this.profileData.email,profileImg:this.secondReader.result}).subscribe(data=>{console.log(data);this.ngOnInit()},err=>console.log(err));
        
      }
      else{
        alert(this.selectedPicture.size/(1024*1024));
      }  
    }
    else{
      alert("Select a Picture First");
    }

    

    
  }


 

}
