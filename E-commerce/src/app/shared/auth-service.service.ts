import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseUrl:string = 'https://ecommerce.routemisr.com';
  userData:any;
  constructor(private _HttpClient:HttpClient,private _Router:Router) { }
  saveToken():void{
    if(localStorage.getItem('userToken')!=null){
      let userDataencoded:any = localStorage.getItem('userToken');
      let userDatadecoded:any = jwtDecode(userDataencoded);
      this.userData = userDatadecoded
      console.log(this.userData);
    }
  }
  registerUser(data:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`,data);
  }
  userLogin(data:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`,data);
  }
  userLogout():void{
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login'])
  }
}
