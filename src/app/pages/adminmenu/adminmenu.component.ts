import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthData } from 'src/app/models/authdata';
import { StockapiService } from 'src/app/services/stockapi.service';
import { Title } from '@angular/platform-browser';
import { AppapiService } from '../../services/appapi.service';
import { NotificationService } from '../../services/notification.service';

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
  indexUpdateTime: any;
  watchlistUpdateTime: any;
  genstockUpdateTime: any;
  userCount: any;
  stockCount: any;
  testNoti: any;
  notiRes: any;
  testNotiUser: any;
  testNotiTitle: any = "";
  testNotiBody: any = "";
  testNotiLink: any;
  maintMode: any;
  constructor(
    private authApi: AuthService,
    private stockApi: StockapiService,
    private titleService: Title,
    private appapi: AppapiService,
    private notiService: NotificationService
  ) {
      this.titleService.setTitle( "9Forty5 - Admin Menu" );
      this.token = window.localStorage.getItem('jwt');
      this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
        this.jwtData = authData[1];
        if(this.jwtData){
          this.jwtUsertype = this.jwtData.data.usertype;
          this.appapi.getAppData().subscribe((data) =>{
            this.indexUpdateTime = data[0].value;
            this.genstockUpdateTime = data[1].value;
            this.watchlistUpdateTime = data[2].value;
            this.maintMode = data[4].value;
          });
          this.authApi.countUsers().subscribe((usercount) => {
            this.userCount = usercount;
          })
          this.stockApi.countGenStocks().subscribe((stockcount) => {
            this.stockCount = stockcount;
          })
        }else{
        }
      });
  }

  ngOnInit(): void {}

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

  clearNotiRes(){
    this.notiRes = '';
  }

  createTestNoti(){
    this.testNoti = [this.testNotiUser, this.testNotiTitle, this.testNotiBody, this.testNotiLink];
    this.notiService.createNoti(this.testNoti).subscribe((notiRes: any) =>{
      this.notiRes = notiRes;
    }, (err: any) => this.notiRes = err);
          console.log(this.testNoti);
    }
  toggleMaint(){
    this.appapi.toggleMaintenance().subscribe((data: any) => {
      if(data=="false"){
        window.localStorage.removeItem('adminAccess');
      }
      window.location.href = '/';
    })
  }
}
