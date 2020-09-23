import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss'],
  providers: [DatePipe]
})
export class HomeBannerComponent implements OnInit {
  marketStatus: any;
  currentTime: any;
  currentTimeHour: any;
  currentTimeMinute:any;
  actualTime: any;
  currentDay: string;
  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.currentTime = this.datePipe.transform(Date(), 'h:mm a');
    this.currentTimeHour = this.datePipe.transform(Date(), 'H');
    this.currentTimeMinute = this.datePipe.transform(Date(), 'mm');
    this.currentDay = this.datePipe.transform(Date(), 'EEEE');
    this.actualTime = this.currentTimeHour + this.currentTimeMinute;
    if(this.currentDay != "Saturday" && this.currentDay != "Sunday"){
      if(this.actualTime > 929 && this.actualTime < 1599 ){
        this.marketStatus = "OPEN";
      } else {
        this.marketStatus = "CLOSED";
      }
    } else {
      this.marketStatus = "CLOSED";
    }
  }


}
