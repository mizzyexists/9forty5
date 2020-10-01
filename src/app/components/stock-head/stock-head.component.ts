import { Component, OnInit } from '@angular/core';
import { StockapiService } from '../../services/stockapi.service';
import { IndexData } from '../../models/indexdata';

@Component({
  selector: 'app-stock-head',
  templateUrl: './stock-head.component.html',
  styleUrls: ['./stock-head.component.scss']
})
export class StockHeadComponent implements OnInit {

  tickerbarindexids: any = "1,3,4,260"
  SPticker: any = "4"
  Nasdaqticker: any = "3"
  Goldticker: any = "260"
  djia_price: any;
  sp_price: any;
  nasdaq_price: any;
  gold_price: any;
  dowData: any;
  spData: any;
  nasData: any;
  goldData: any;
  dowChange: any;
  spChange: any;
  nasChange: any;
  goldChange: any;
  fetchedindexData: any;
  dowChangeValue: any;
  spChangeValue: any;
  nasChangeValue: any;
  goldChangeValue: any;
  dowChangePerc: any;
  spChangePerc: any;
  nasChangePerc: any;
  goldChangePerc: any;
  constructor(
    private stockApi: StockapiService
  ) {
      this.stockApi.getIndexData().subscribe((indexData: IndexData[]) => {
        this.fetchedindexData = indexData;
        this.djia_price = this.fetchedindexData[0].price;
        this.dowChangeValue = this.fetchedindexData[0].chg;
        this.dowChangePerc = this.fetchedindexData[0].chg_percent;
        if(this.fetchedindexData[0].chg >= 0){
          this.dowChange = "Positive"
        }
        else if(this.fetchedindexData[0].chg < 0){
          this.dowChange = "Negative"
        }
        this.nasdaq_price = this.fetchedindexData[1].price;
        this.nasChangeValue = this.fetchedindexData[1].chg;
        this.nasChangePerc = this.fetchedindexData[1].chg_percent;
        if(this.fetchedindexData[1].chg >= 0){
          this.nasChange = "Positive"
        }
        else if(this.fetchedindexData[1].chg < 0){
          this.nasChange = "Negative"
        }
        this.sp_price = this.fetchedindexData[2].price;
        this.spChangeValue = this.fetchedindexData[2].chg;
        this.spChangePerc = this.fetchedindexData[2].chg_percent;
        if(this.fetchedindexData[2].chg >= 0){
          this.spChange = "Positive"
        }
        else if(this.fetchedindexData[2].chg < 0){
          this.spChange = "Negative"
        }
        this.gold_price = this.fetchedindexData[3].price;
        this.goldChangeValue = this.fetchedindexData[3].chg;
        this.goldChangePerc = this.fetchedindexData[3].chg_percent;
        if(this.fetchedindexData[3].chg >= 0){
          this.goldChange = "Positive"
        }
        else if(this.fetchedindexData[3].chg < 0){
          this.goldChange = "Negative"
        }
      })
  }

  ngOnInit(): void {}

}
