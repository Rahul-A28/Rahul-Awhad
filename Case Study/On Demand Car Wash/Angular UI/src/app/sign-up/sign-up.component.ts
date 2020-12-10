import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms' ;
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private http:HttpClient,private auth:AuthService,private route:Router) { }

  ngOnInit(): void {
    this.auth.verifyUser().subscribe(data=>this.route.navigate(['/dashboard']),err=>this.route.navigate(['/signUp']));
  }

  submit(formValues:any){
    console.log(formValues);
    this.http.post("http://localhost:3000/register",formValues).subscribe((res)=>{console.log(res);alert("Registerd Successfully");this.route.navigate(['/login'])});
  }

}
