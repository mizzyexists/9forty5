import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StockData } from '../models/stockdata';
import { Observable } from 'rxjs';
import { first, take } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { StockapiService } from '../services/stockapi.service';

@Injectable( )
export class WatchlistResolver implements Resolve<StockData>{

  constructor(
    private stockapi: StockapiService
  ){

  }
  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot):
   Observable<any> {
    return this.stockapi
    .getWatchlistStocks()
    .pipe(first());
  }

}
