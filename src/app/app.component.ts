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
  homeCheck: any;
  constructor(
    private router: Router
  ){
    router.events.subscribe((_: NavigationEnd) => {
      this.homeCheck = this.router.url;
      if(this.homeCheck == '/'){
        this.isHome=true;
      }else{
        this.isHome=false;
      }
    });
  }
}
