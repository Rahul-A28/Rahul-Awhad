import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private route:Router) { }
  
  isLoggedIn = false;
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLogged.asObservable();
  profileEmail="";
  profileData:any = {};


// login(formValues:any){
//   this.http.post("http://localhost:3001/login", formValues).subscribe((data)=>{
//     localStorage.setItem('token',data.toString());
//     console.log(data);
//     this.isLoggedIn = true;
//     this.isLogged.next(this.isLoggedIn);
    
//     this.route.navigate(['/dashboard']);
//   },
//   error=>alert("Invalid email or password"));
// }

login(formValues:any){
  this.http.post("http://localhost:3001/login", formValues).subscribe((data)=>{
    localStorage.setItem('token',data.toString());
    console.log(data);
    this.isLoggedIn = true;
    this.isLogged.next(this.isLoggedIn);
    
    this.route.navigate(['/dashboard']);
  },
  error=>alert("Invalid email or password"));
}

logout(){
  localStorage.removeItem('token');
  this.isLoggedIn = false;
  this.route.navigate(['/login']);
}

getIsLoggedIn(){
  return this.isLoggedIn;
}
localToken = localStorage.getItem('token')!;
verifyUser(){
  return this.http.get("http://localhost:3001/verify", { observe: 'body',
    params: new HttpParams().append('token', localStorage.getItem('token')!)
  })
}

getProfileData(){
  return this.profileData;
}



}
