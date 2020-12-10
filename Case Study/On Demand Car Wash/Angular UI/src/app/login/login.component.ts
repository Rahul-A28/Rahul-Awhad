import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private route:Router) { }

  ngOnInit(): void {
    this.auth.verifyUser().subscribe(data=>this.route.navigate(['/dashboard']),err=>this.route.navigate(['/login']));
  }

  login(formValues:any){
    this.auth.login(formValues);
  }

}
