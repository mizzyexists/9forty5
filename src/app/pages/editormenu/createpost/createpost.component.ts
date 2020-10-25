import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../../../services/toast.service';
import { PostService } from '../../../services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthData } from 'src/app/models/authdata';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {
  newPostTitle: any;
  newPostExcerpt: any;
  newPostImage: any;
  newPostBody: any;
  imageBase64: string | ArrayBuffer;
  token: string;
  jwtData: any;
  jwtUsername: any;
  previewMode: string = "false";
  constructor(
    private titleService: Title,
    private toastService: ToastService,
    private postApi: PostService,
    private authApi: AuthService
  ) {
    this.titleService.setTitle( "9Forty5 - Create Post" );
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
    if(this.newPostTitle && this.newPostExcerpt && this.imageBase64 && this.newPostBody){
      const newPostData = {title: this.newPostTitle, excerpt: this.newPostExcerpt, image: this.imageBase64, body: this.newPostBody, author: this.jwtUsername};
      this.postApi.newPost(newPostData).subscribe((res: any) => {
        if(res[0]==1){
          this.toastService.show('Post Created', { classname: 'bg-light text-dark'});
          setTimeout(() => window.location.href = 'post/'+res[1], 1500);
        }
        else{
          this.toastService.show(res, { classname: 'bg-danger text-light'});
        }
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

  removeUpload(){
    this.imageBase64 = null;
    this.newPostImage = null;
  }

  previewPost(){
    this.previewMode="true";
  }

  exitPreview(){
    this.previewMode="false";
  }

}
