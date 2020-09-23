import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


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
    });
  }
}
