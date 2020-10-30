import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/models/authdata';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-discordpopup',
  templateUrl: './discordpopup.component.html',
  styleUrls: ['./discordpopup.component.scss']
})
export class DiscordpopupComponent implements OnInit {
  token: string;
  jwtData: any;
  jwtUsername: string;
  discordLink: any;
  constructor(
    private authApi: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      if(authData && authData[0]==true){
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
    }
    })
  }

  ngOnInit(): void {
    this.loadDiscordLink();
  }

  dismissDiscord(){
    window.localStorage.setItem('DiscordPopUp', 'false');
  }

  loadDiscordLink(){
    if(this.jwtUsername){
      this.discordLink = "https://discordapp.com/widget?id=768469268349321246&theme=dark&username="+this.jwtUsername;
      this.discordLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.discordLink);
    }else{
      this.discordLink = "https://discordapp.com/widget?id=768469268349321246&theme=dark";
      this.discordLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.discordLink);
    }
  }
}
