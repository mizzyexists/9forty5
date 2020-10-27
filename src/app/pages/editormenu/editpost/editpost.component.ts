import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../../../services/toast.service';
import { PostService } from '../../../services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthData } from 'src/app/models/authdata';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {
  editPostTitle: any;
  editPostExcerpt: any;
  editPostImage: any;
  editPostBody: any;
  imageBase64: string | ArrayBuffer;
  token: string;
  jwtData: any;
  jwtUsername: any;
  previewMode: string = "false";
  postID: any;
  postData: any;
  constructor(
    private titleService: Title,
    private toastService: ToastService,
    private postApi: PostService,
    private routes: ActivatedRoute,
    private authApi: AuthService
  ) {
    this.token = window.localStorage.getItem('jwt');
    const routeParams = this.routes.snapshot.params;
    this.postID = routeParams.id;
    this.titleService.setTitle( "9Forty5 - Edit Post - PID: " +this.postID );
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
    this.postApi.fetchPostByPID(this.postID).subscribe((data) => {
      this.postData = data;
      this.editPostTitle = this.postData.post_title;
      this.editPostExcerpt = this.postData.post_excerpt;
      this.imageBase64 = this.postData.post_image;
      this.editPostBody = this.postData.post_body;
    })
  }

  ngOnInit(): void {
  }

  savePost(){
    if(!this.editPostTitle || this.editPostTitle==''){
      this.toastService.show('No Title', { classname: 'bg-danger text-light'});
    }
    if(!this.editPostExcerpt || this.editPostExcerpt==''){
      this.toastService.show('No Excerpt', { classname: 'bg-danger text-light'});
    }
    if(!this.imageBase64 || this.imageBase64==''){
      this.toastService.show('No Image', { classname: 'bg-danger text-light'});
    }
    if(!this.editPostBody || this.editPostBody==''){
      this.toastService.show('No Body', { classname: 'bg-danger text-light'});
    }
    if(this.postID, this.editPostTitle && this.editPostExcerpt && this.imageBase64 && this.editPostBody){
      const newPostData = {pid: this.postID, title: this.editPostTitle, excerpt: this.editPostExcerpt, image: this.imageBase64, body: this.editPostBody, author: this.jwtUsername};
      this.postApi.editPost(newPostData).subscribe((res: any) => {
        if(res[0]==1){
          this.toastService.show('Post Updated', { classname: 'bg-light text-dark'});
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

  previewPost(){
    this.previewMode="true";
  }

  exitPreview(){
    this.previewMode="false";
  }


}
