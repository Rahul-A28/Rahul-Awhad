import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.css']
})
export class DashNavComponent implements OnInit {
  isLoggedIn=false;
  constructor(private auth:AuthService, private route:Router) {
    this.auth.verifyUser().subscribe(data=>this.isLoggedIn=true,err=>this.route.navigate(['/login']));
   }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout();
  }

}
