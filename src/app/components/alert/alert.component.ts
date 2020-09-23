import { Component, OnInit } from '@angular/core';
interface Alert {
  type: string;
  title: string;
  message: string;
}

const ALERTS: Alert[] = [{
    type: 'info',
    title: 'Please Note',
    message: 'All price info is updated hourly.',
  }
];

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alerts: Alert[];
  wasClosed: any;

  constructor() {
    this.reset();
  }

  ngOnInit(){
    this.wasClosed = window.localStorage.getItem('alertClosed');
    if(this.wasClosed == "true"){
      this.closeAlert(this.alerts[0]);
    } else{
    }
  }

  closeAlert(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
    window.localStorage.setItem('alertClosed', "true");
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }
}
