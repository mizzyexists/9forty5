import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/models/authdata';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';
import { UploadService } from '../../../services/upload.service';
import { UserData } from '../../../models/userdata';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profileName: any;
    profileAvatar: any;
    profileType: any;
    profileUser: any;
    profileBio: any;
    token: string;
    jwtData: any;
    userID: any;
    userSlug: any;
    profileID: any;
    jwtUsertype: any;
    profileLogin: any;
    profileEmail: any;
    refreshlink: any;
    userName: any;
    userEmail: any;
    jwtUID: any;
    userData: UserData[]
    jwtUsername: any;
    profileIsPC: any;
    isLoading: boolean;
    constructor(
      private authApi: AuthService,
      private routes: ActivatedRoute,
      private titleService: Title
    ){
       this.token = window.localStorage.getItem('jwt');
       const routeParams = this.routes.snapshot.params;
       this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
         this.jwtData = authData[1];
         if(this.jwtData){
           this.userID = this.jwtData.data.uid;
           this.userSlug = this.jwtData.data.slug;
           this.jwtUsertype = this.jwtData.data.usertype;
        }else{

        }
         });
       this.authApi.fetchUserBySlug(routeParams.slug).subscribe((data: any) => {
       this.userData = data;
       this.profileID = data.uid;
       this.profileUser = data.username;
       this.profileAvatar = data.image_path;
       this.profileType = data.usertype;
       this.profileName = data.fname + " " + data.lname;
       this.profileBio = data.bio_text;
       this.profileLogin = data.last_login;
       this.profileEmail = data.email;
       this.profileIsPC = data.is_playcaller;
       this.titleService.setTitle( "9Forty5 - "+ this.profileUser + "'s Profile" );
       this.isLoading = false;
       });
    }

    ngOnInit() {}

 }
