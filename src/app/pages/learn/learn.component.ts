import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LearnTabs } from '../../models/learntabs';
import { LearninghubService } from '../../services/learninghub.service';
import { AuthData } from 'src/app/models/authdata';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {
  learnTabs: LearnTabs[];
  token: string;
  jwtData: any;
  jwtUsertype: any;

  constructor(
    private titleService: Title,
    private learnApi: LearninghubService,
    private authApi:AuthService

  ) {
    this.learnApi.getTabs().subscribe((data: LearnTabs[]) => {
      this.learnTabs = data;
    })
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
    if(!authData || authData[0]!=true){
    window.localStorage.removeItem('jwt');
    };
    if(authData && authData[0]==true){
    this.jwtData = authData[1];
    this.jwtUsertype = this.jwtData.data.usertype;
    }
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle( "9Forty5 - Learning Hub" );
  }

}
