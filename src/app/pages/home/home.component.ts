import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  postData: any;

  constructor(
    private titleService: Title,
    private postApi: PostService
  ) {
    this.titleService.setTitle( "9Forty5 - Stock Analysis, Discussion, Blog" );
    this.postApi.getLatestPosts().subscribe((data) => {
      this.postData = data;
    })
  }

  ngOnInit(): void {
  }

}
