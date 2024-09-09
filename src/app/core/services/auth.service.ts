import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable ,inject} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userData :any = null;
private readonly _HttpClient = inject(HttpClient)
private readonly _Router = inject(Router)

setRegisterForm(data:object):Observable<any>
{
return  this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
}
setloginForm(data:object):Observable<any>
{
return  this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
}
saveUserData():void{
if(localStorage.getItem('userToken') !==null){
// this.userData= jwtDecode(localStorage.getItem('userToken') !)
console.log('user Data' ,this.userData);

}
}
logout():void{
localStorage.removeItem('userToken')
this.userData=null;
this._Router.navigate(['/login'])

}
setEmailVerify(data:object):Observable<any>
{
return  this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
}
setCodeVerify(data:object):Observable<any>
{
return  this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
}
resetPass(data:object):Observable<any>
{
return  this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
}
}
