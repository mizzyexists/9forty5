import { Component, OnInit } from '@angular/core';
import { StockapiService } from '../../services/stockapi.service';

@Component({
  selector: 'app-refreshstocks',
  templateUrl: './refreshstocks.component.html',
  styleUrls: ['./refreshstocks.component.scss']
})
export class RefreshstocksComponent implements OnInit {

  constructor(
    private stockApi: StockapiService
  ) { }

  ngOnInit(): void {
    this.refreshIndex();
    this.refreshWatchlist();
    this.refreshGenList();
  }

  refreshIndex(){
    this.stockApi.refreshIndexData().subscribe((_res: any) => {});
  }
  refreshWatchlist(){
    this.stockApi.refreshWatchlistStocks().subscribe((_res: any) => {});
  }
  refreshGenList(){
    this.stockApi.refreshAllStocks().subscribe((_res: any) => {});
  }

}
