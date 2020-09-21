import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-hotstocks',
  templateUrl: './hotstocks.component.html',
  styleUrls: ['./hotstocks.component.scss']
})
export class HotstocksComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle( "9Forty5 - Hot Stocks" );
  }

}
