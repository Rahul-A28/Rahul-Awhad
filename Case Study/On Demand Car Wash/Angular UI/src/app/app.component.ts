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

  // isLoggedIn = true;
  subscription: Subscription = this.auth.isLoggedIn$.subscribe(isLogged=>this.isLoggedIn = isLogged);
  isLoggedIn=false;
  //refresh: Subscription = new Subscription;
  constructor(private auth:AuthService, private route:Router,private _activatedRoute: ActivatedRoute){
    // this.auth.verifyUser().subscribe(data=>this.isLoggedIn=true,err=>this.route.navigate(['/login']));
  //   this._activatedRoute.paramMap.subscribe(params => {
  //     this.ngOnInit();
  // });
  }

  ngOnInit(){
    console.log("Visited");
    // this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    if(this.auth.verifyUser().subscribe(data=>this.isLoggedIn=true)){
      this.isLoggedIn = true;
    }
    this.subscription = this.auth.isLoggedIn$.subscribe(isLogged=>this.isLoggedIn = isLogged);
    // if(localStorage.getItem('token')!=null){
    //   this.refresh = this.auth.verifyUser().subscribe(data=>this.isLoggedIn=true,err=>this.route.navigate(['/login']));
    // }
    

  }

  logout(){
    this.isLoggedIn = false;
    this.auth.logout();
  }
  nothing(){

  }


}
