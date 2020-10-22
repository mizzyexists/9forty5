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
  newPostTitle: any;
  newPostExcerpt: any;
  newPostImage: any;
  newPostBody: any;
  imageBase64: string | ArrayBuffer;
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

  ngOnInit(): void {
  }

  createPost(){
    if(!this.newPostTitle || this.newPostTitle==''){
      this.toastService.show('No Title', { classname: 'bg-danger text-light'});
    }
    if(!this.newPostExcerpt || this.newPostExcerpt==''){
      this.toastService.show('No Excerpt', { classname: 'bg-danger text-light'});
    }
    if(!this.imageBase64 || this.imageBase64==''){
      this.toastService.show('No Image', { classname: 'bg-danger text-light'});
    }
    if(!this.newPostBody || this.newPostBody==''){
      this.toastService.show('No Body', { classname: 'bg-danger text-light'});
    }
    else{
      const newPostData = {title: this.newPostTitle, excerpt: this.newPostExcerpt, image: this.imageBase64, body: this.newPostBody, author: this.jwtUsername};
      this.postApi.newPost(newPostData).subscribe((_res) => {
      })
    }
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.imageBase64 = reader.result;
    };
}

}
