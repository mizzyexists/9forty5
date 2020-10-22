import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AuthData } from 'src/app/models/authdata';
import { Title } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  token: string;
  jwtData: any;
  userID: any;
  userSlug: any;
  jwtUsertype: any;
  postData: import("/Users/Mizzy/Documents/Websites/stocks-app/src/app/models/postdata").PostData[];
  postTitle: any;

  constructor(
    private authApi: AuthService,
    private routes: ActivatedRoute,
    private titleService: Title,
    private postApi: PostService
  ) {
    this.token = window.localStorage.getItem('jwt');
    const routeParams = this.routes.snapshot.params;
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
    this.jwtData = authData[1];
    if(this.jwtData){
    this.userID = this.jwtData.data.uid;
    this.jwtUsertype = this.jwtData.data.usertype;
  }});
    this.postApi.fetchPostBySlug(routeParams.slug).subscribe((data) => {
      this.postData = data;
      this.titleService.setTitle( "9Forty5 - "+ this.postData.post_title);
    })
  }

  ngOnInit(): void {
  }

}
