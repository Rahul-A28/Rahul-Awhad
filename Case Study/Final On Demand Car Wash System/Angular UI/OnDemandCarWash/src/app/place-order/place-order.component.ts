import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



declare const Razorpay:any;
declare const L:any;
declare const Alert:any;


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

  lat:Number = 0;
  lng:Number = 0;
  

  constructor(private auth:AuthService, public route:Router,private http:HttpClient,private zone: NgZone) {
    PlaceOrderComponent.ROUTE_SERVICE = this.route;
    PlaceOrderComponent.HTTP_SERVICE = this.http;
    PlaceOrderComponent.ZONE_SERVICE = this.zone;
   }

  state1="";
  city1="";
  street1="";

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

    navigator.geolocation.getCurrentPosition((position)=>{

      this.lat=position.coords.latitude;
      this.lng=position.coords.longitude;
      
      
      var mymap = L.map('mapid2').setView([position.coords.latitude,position.coords.longitude], 15);
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

    })
  }

  submitOrder(formData:any){
    
    const [packageName, packagePrice] = formData.package.split(" ");
    const custId = this.profileData.email;
    const custName = this.profileData.firstName + " " + this.profileData.lastName;
    const carName = formData.carName;
    const carLocation = formData.street + ", " + formData.city + ", " + formData.state;
    const carPlateNo = formData.carPlateNo;
    const custPhoneNo = this.profileData.phone;
    const geometry = {type:'point',coordinates:[this.lat,this.lng]};
    const orderPosted = new Date().toLocaleString('en-GB', { timeZone: 'IST' });
    PlaceOrderComponent.orderData = {custId:custId,custName:custName,carLocation:carLocation,carPlateNo:carPlateNo,custPhoneNo:custPhoneNo,packageName:packageName,packagePrice:packagePrice,orderPosted:orderPosted,carName:carName,geometry:geometry};
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
    (err)=>console.log(err)); //SUbscribe Ends Here


  }

  razorPayResponseHandler(response:any) {
    
    console.log(response);
    Alert.render("Payment Successfull !!");
    PlaceOrderComponent.HTTP_SERVICE.post("http://localhost:3002/newOrder",PlaceOrderComponent.orderData).subscribe((data)=>{console.log(data);PlaceOrderComponent.ZONE_SERVICE.run(()=>PlaceOrderComponent.ROUTE_SERVICE.navigate(['/dashboard']))},(err)=>console.log(err));
  }


}


