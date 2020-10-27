import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';
import { AppapiService } from './services/appapi.service';
import { ToastService } from './services/toast.service';
import { AuthData } from './models/authdata';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'stockng';
  loading: boolean = false;
  loadingTime: any;
  maintenanceMode:any;
  adminAccess: any;
  adminCode: any;
  token: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  isBanned: string;
  isAppealing: any = 'false';
  constructor(
    private router: Router,
    private toastService: ToastService,
    private appapi: AppapiService,
    private authApi: AuthService
  ){
    this.adminAccess = window.localStorage.getItem('adminAccess');
    this.appapi.checkMaintenance().subscribe((response: any) => {
      if(response=="true"){
      this.maintenanceMode ='true';
      }else{
        this.maintenanceMode = 'false';
        if(this.adminAccess){
        window.localStorage.removeItem('adminAccess');
        this.adminAccess = "";
        }
        else{
        }
      }
    });
    this.checkAuthToken();
    this.isBanned = window.localStorage.getItem('isBanned');
  }

  ngAfterViewInit() {
       this.router.events
           .subscribe((event) => {
               if(event instanceof NavigationStart) {
                  this.loadingTime = Math.random() * (100 + 700) - 100;
                  this.loading = true;
               }
               else if (
                   event instanceof NavigationEnd ||
                   event instanceof NavigationCancel
                   ) {
                   setTimeout(() => this.loading = false, this.loadingTime);
               }
           });
   }

   submitCode(){
     this.appapi.checkAdminCode(this.adminCode).subscribe((data:any) => {
       if(data=="true"){
        window.localStorage.setItem('adminAccess', 'true');
        window.location.href = './';
       }
       else{
         this.adminCode = "";
         this.toastService.show('Invalid Access Code', { classname: 'bg-danger text-light'});
       }
     })
   }

   checkAuthToken(){
     this.token = window.localStorage.getItem('jwt');
     if(this.token){
       this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
         if(!authData || authData[0]!=true){
           window.localStorage.removeItem('jwt');
           window.localStorage.removeItem('isAdmin');
           window.localStorage.removeItem('isEditor');
           window.location.href = '/';
         };
         if(authData && authData[0]==true){
           this.jwtData = authData[1];
           this.jwtUsername = this.jwtData.data.username;
           this.jwtUsertype = this.jwtData.data.usertype;
           if(this.jwtUsertype == 'Super-Admin' || this.jwtUsertype == 'Admin'){
             window.localStorage.setItem('isAdmin', 'true');
             window.localStorage.removeItem('isEditor');
           }
           if(this.jwtUsertype == 'Editor'){
             window.localStorage.removeItem('isAdmin');
             window.localStorage.setItem('isEditor', 'true');
           }
           if(this.jwtUsertype != 'Super-Admin' && this.jwtUsertype != 'Admin' && this.jwtUsertype != 'Editor'){
             window.localStorage.removeItem('isEditor');
             window.localStorage.removeItem('isAdmin');
           }
         }
       });
     }
   }

   appealBan(){
     this.isAppealing = 'true';
   }
}
