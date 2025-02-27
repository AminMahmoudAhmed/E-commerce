import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../../../shared/environment/environment';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient :HttpClient) { }

  private readonly router = inject(Router)

  userData:any;


  sendRegisterForm (data:object):Observable<any>
  {
  
    return this.httpClient.post(environment.baseUrl +'/api/v1/auth/signup',data)
    

  }


  sendLoginForm (data:object):Observable<any>
  {
    return this.httpClient.post(environment.baseUrl +'/api/v1/auth/signin',data)
  }

getUserData():void{
  if(localStorage.getItem("token") !== null){
  this.userData = jwtDecode(localStorage.getItem("token")!)
  console.log(  'userData' ,this.userData);
  }
  //  this.userData = jwtDecode(localStorage.getItem("token") !)
  //  console.log(this.userData);
  // }

}



logout():void{
  localStorage.removeItem("token");
  this.userData = null;

  this.router.navigate(['/login'])
}


 

 sendVerifyEmail(data:object):Observable<any>
 {
   return this.httpClient.post( environment.baseUrl +'/api/v1/auth/forgotPasswords',data)
 }


 sendVerifyCode(data:object):Observable<any>
 {
   return this.httpClient.post(environment.baseUrl +'/api/v1/auth/verifyResetCode',data)
 }


 

 sendResetPassword(data:object):Observable<any>
 {
   return this.httpClient.put(environment.baseUrl +'/api/v1/auth/resetPassword',data)
 }


}
