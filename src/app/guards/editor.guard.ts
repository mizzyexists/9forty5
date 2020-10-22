import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthData } from '../models/authdata';


@Injectable({
  providedIn: 'root'
})
export class EditorGuard implements CanActivate {
  token: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  response: any;
  edCheck: string;
  admCheck: string;
  constructor(
  private authApi:AuthService
  ){
    this.checkPerm();
  }

  checkPerm(){
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
   _next: ActivatedRouteSnapshot,
   _state: RouterStateSnapshot):boolean{

   this.edCheck = window.localStorage.getItem('isEditor');
   this.admCheck = window.localStorage.getItem('isAdmin');
   if(this.edCheck=='true' || this.admCheck=='true'){
     return true;
   }
   if(!this.edCheck || this.edCheck!='true'){
     return false;
   }
   else{
     return false;
   }
  }

}
