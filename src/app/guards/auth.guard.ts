import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthData } from '../models/authdata';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  response: any;
  constructor(
  private authApi:AuthService
  ){}

  checkAuthToken(){
  this.token = window.localStorage.getItem('jwt');
  this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
  if(!authData || authData[0]!=true){
  window.localStorage.removeItem('jwt');
  window.location.href = '/';
  };
  if(authData && authData[0]==true){
  this.jwtData = authData[1];
  this.jwtUsername = this.jwtData.data.username;
  this.jwtUsertype = this.jwtData.data.usertype;
  }
  });
  }

  canActivate(
   next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

   this.checkAuthToken();
   this.token = window.localStorage.getItem('jwt');
   if(this.token){
     return true;
   }
   if(!this.token){
     return false;
   }
  }

}
