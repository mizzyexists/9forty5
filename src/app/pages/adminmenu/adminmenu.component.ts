import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthData } from 'src/app/models/authdata';
import { StockapiService } from 'src/app/services/stockapi.service';

@Component({
  selector: 'app-adminmenu',
  templateUrl: './adminmenu.component.html',
  styleUrls: ['./adminmenu.component.scss']
})
export class AdminmenuComponent implements OnInit {
  jwtUsertype: any;
  token: string;
  jwtData: any;
  indexRes: any;
  watchlistRes: any;
  stockRes: any;
  constructor(
    private authApi: AuthService,
    private stockApi: StockapiService
  ) { }

  ngOnInit(): void {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsertype = this.jwtData.data.usertype;
    });
  }

  refreshIndex(){
    this.stockApi.refreshIndexData().subscribe((res: any) => {
      this.indexRes = res;
    }, (err: any) => this.indexRes = err[0]);
  }

  refreshWatchlist(){
    this.stockApi.refreshWatchlistStocks().subscribe((res: any) => {
      this.watchlistRes = res;
    }, (err: any) => this.watchlistRes = err);
  }

  refreshGenList(){
    this.stockApi.refreshAllStocks().subscribe((res: any) => {
      this.stockRes = res;
    }, (err: any) => this.stockRes = err);
  }

  clearRes(){
    this.watchlistRes = '';
    this.stockRes = '';
    this.indexRes = '';
  }
}
