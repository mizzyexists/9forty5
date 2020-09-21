import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-head',
  templateUrl: './stock-head.component.html',
  styleUrls: ['./stock-head.component.scss']
})
export class StockHeadComponent implements OnInit {

  djia_price: any = "200";
  sp_price: any = "500";
  nasdaq_price: any = "700";
  gold_price: any = "300";

  constructor() { }

  ngOnInit(): void {
  }

}
