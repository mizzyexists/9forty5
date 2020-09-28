import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gainzone',
  templateUrl: './gainzone.component.html',
  styleUrls: ['./gainzone.component.scss']
})
export class GainzoneComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle( "9Forty5 - GainZone" );
  }

}
