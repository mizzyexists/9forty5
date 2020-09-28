import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
import { StockData } from '../models/stockdata';
import { IndexData } from '../models/indexdata';
import { ServerInfo } from '../models/serverinfo';


@Injectable({
  providedIn: 'root'
})
export class StockapiService {
  serverInfo = ServerInfo;
  PHP_API_SERVER = this.serverInfo.phpApiServer;

  constructor(
    private httpClient: HttpClient,
  ) {}

  getWatchlistStocks(): Observable<StockData[]>{
  return this.httpClient.get<StockData[]>(`${this.PHP_API_SERVER}/stocks/getwatchliststocks.php`);
  }

  getIndexData(): Observable<IndexData[]>{
  return this.httpClient.get<IndexData[]>(`${this.PHP_API_SERVER}/stocks/getmainindicies.php`);
  }

  refreshIndexData(): Observable<IndexData[]>{
  return this.httpClient.get<IndexData[]>(`${this.PHP_API_SERVER}/stocks/mainindexrefresh.php`);
  }

  refreshWatchlistStocks(): Observable<StockData[]>{
  return this.httpClient.get<StockData[]>(`${this.PHP_API_SERVER}/stocks/stockwatchlistrefresh.php`);
  }

  refreshAllStocks(): Observable<StockData[]>{
  return this.httpClient.get<StockData[]>(`${this.PHP_API_SERVER}/stocks/stockgeneralrefresh.php`);
  }

  countGenStocks(): Observable<StockData[]>{
  return this.httpClient.get<StockData[]>(`${this.PHP_API_SERVER}/stocks/countgenstocks.php`);
  }


}
