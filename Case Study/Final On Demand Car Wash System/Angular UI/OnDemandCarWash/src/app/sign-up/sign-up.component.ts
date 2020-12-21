import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms' ;
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

declare const Alert:any;
declare var Tasks: {};

declare let L:any;

 
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private http:HttpClient,private auth:AuthService,private route:Router) { }

    lat:Number = 0;
    lng:Number = 0;
    state1 = "";
    city1 = "";
    street1 = "";
  
  
  ngOnInit(): void {
    this.auth.verifyUser().subscribe(data=>this.route.navigate(['/dashboard']),err=>this.route.navigate(['/signUp']));

    
     

    navigator.geolocation.getCurrentPosition((position)=>{

      this.lat=position.coords.latitude;
      this.lng=position.coords.longitude;
      
      
      var mymap = L.map('mapid').setView([position.coords.latitude,position.coords.longitude], 15);
      var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFodWxtYXBib3gxIiwiYSI6ImNraWw1NDN0azBldzcydnBkaGJrNmxpYnMifQ.QLEo1Eg9y7GklM6RzZJxrg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    

    var geocodeService = L.esri.Geocoding.geocodeService();
    const onMapClick = (e:any) =>{
      console.log(e.latlng);
      this.lat=e.latlng.lat;
      this.lng=e.latlng.lng;
      var lati = (e.latlng.lat);
      var lngi = (e.latlng.lng);
      var newLatLng = new L.LatLng(lati, lngi);
      marker.setLatLng(newLatLng);
      geocodeService.reverse().latlng(e.latlng).run( (error:any, result:any) => {
        if (error) {
          return;
        }
        console.log(result.address);
        this.state1 = result.address.Region;
        this.city1 = result.address.City;
        this.street1 = result.address.LongLabel;
        marker.setLatLng(result.latlng).addTo(mymap).bindPopup(result.address.Match_addr).openPopup();
      });
      
      
  }
  
    mymap.on('click', onMapClick);

    



    // Search Box
    var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();
    var gisDay = L.esri.Geocoding.featureLayerProvider({
        url: 'https://services.arcgis.com/uCXeTVveQzP4IIcx/arcgis/rest/services/GIS_Day_Final/FeatureServer/0',
        searchFields: ['Name', 'Organization'], // Search these fields for text matches
        label: 'GIS Day Events', // Group suggestions under this header
        formatSuggestion: function (feature:any) {
          return feature.properties.Name + ' - ' + feature.properties.Organization; // format suggestions like this.
        }
      });


    var searchControl = new L.esri.Geocoding.geosearch({providers: [arcgisOnline, gisDay]}).addTo(mymap);

    var results = new L.LayerGroup().addTo(mymap);

    searchControl.on('results', function(data:any){
      results.clearLayers();
      for (var i = data.results.length - 1; i >= 0; i--) {
        console.log(data.results[i]);
        results.addLayer(L.marker(data.results[i].latlng));
      }
      
    });

    



    });  //navigater end



    
    
 
  }

  submit(formValues:any){
    formValues.geometry = {type:"point", coordinates:[this.lat,this.lng]};
    
    console.log(formValues);
    this.http.post("http://localhost:3000/register",formValues).subscribe((res)=>{console.log(res);Alert.render("Registerd Successfully");
    
  },err=>console.log(err));
  }

  



}
