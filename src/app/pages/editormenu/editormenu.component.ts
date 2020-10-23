import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../../services/toast.service';
import { PostService } from '../../services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthData } from 'src/app/models/authdata';

@Component({
  selector: 'app-editormenu',
  templateUrl: './editormenu.component.html',
  styleUrls: ['./editormenu.component.scss']
})
export class EditormenuComponent implements OnInit {
  token: string;
  jwtData: any;
  jwtUsername: any;
  constructor(
    private titleService: Title,
    private toastService: ToastService,
    private postApi: PostService,
    private authApi: AuthService
  ) {
    this.titleService.setTitle( "9Forty5 - Editor Menu" );
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      if(!authData || authData[0]!=true){
        window.localStorage.removeItem('jwt');
        window.location.href = '/';
      };
      if(authData && authData[0]==true){
        this.jwtData = authData[1];
        this.jwtUsername = this.jwtData.data.username;
      }
    });
  }

  ngOnInit(): void {}
}
