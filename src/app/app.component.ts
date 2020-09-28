import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';


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
  constructor(
    private router: Router
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

}
