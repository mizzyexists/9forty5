import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';
import { AppapiService } from './services/appapi.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stockng';
  isHome: boolean;
  pageCheck: any;
  showWatchlist: boolean;
  loading: boolean = false;
  hasSidebar: boolean;
  loadingTime: any;
  maintenanceMode:any;
  adminAccess: any;
  adminCode: any;
  constructor(
    private router: Router,
    private toastService: ToastService,
    private appapi: AppapiService,
  ){
    router.events.subscribe((_: NavigationEnd) => {
      this.pageCheck = this.router.url;
      if(this.pageCheck == '/'){
        this.isHome=true;
      }else{
        this.isHome=false;
      }
      if(this.pageCheck.includes('/adminmenu') || this.pageCheck.includes('/profile/')){
        this.showWatchlist = false;
      }
      else{
        this.showWatchlist = true;
      }
      if(this.pageCheck == '/' || this.pageCheck.includes('ideas')){
        this.hasSidebar = true;
      }else{
        this.hasSidebar = false;
      }
    });
    this.adminAccess = window.localStorage.getItem('adminAccess');
    this.appapi.checkMaintenance().subscribe((response: any) => {
      console.log(response);
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
}
