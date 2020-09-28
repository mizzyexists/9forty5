import { Component, OnInit } from '@angular/core';
import { StockapiService } from '../../services/stockapi.service';
import { StockData } from '../../models/stockdata';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit {
  stockData: any;

  constructor(
    private stockApi: StockapiService,
  ) { }

  ngOnInit(): void {
    this.stockApi.getWatchlistStocks().subscribe((stockData: StockData[]) => {
      this.stockData = stockData;
    });
  }
}
