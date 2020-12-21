import { noUndefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'OnDemadCarWash';

 
  subscription: Subscription = this.auth.isLoggedIn$.subscribe(isLogged=>this.isLoggedIn = isLogged);
  isLoggedIn=false;

  constructor(private auth:AuthService, private route:Router,private _activatedRoute: ActivatedRoute){
    
  }

  ngOnInit(){
    console.log("Visited");
    
    if(this.auth.verifyUser().subscribe(data=>this.isLoggedIn=true)){
      this.isLoggedIn = true;
    }
    this.subscription = this.auth.isLoggedIn$.subscribe(isLogged=>this.isLoggedIn = isLogged);
    
    

  }

  logout(){
    this.isLoggedIn = false;
    this.auth.logout();
  }
  nothing(){

  }


}
