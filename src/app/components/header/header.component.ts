import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openNav() {
  document.getElementById("mobileNav").style.width = "100%";
  }

  closeNav() {
  document.getElementById("mobileNav").style.width = "0%";
  }

}
