import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthData } from 'src/app/models/authdata';
import { GainzoneService } from '../../../services/gainzone.service';
import { PCData } from 'src/app/models/pcdata';

@Component({
  selector: 'app-playcaller',
  templateUrl: './playcaller.component.html',
  styleUrls: ['./playcaller.component.scss']
})
export class PlaycallerComponent implements OnInit {
  token: string;
  jwtData: any;
  userID: any;
  userSlug: any;
  jwtUsertype: any;
  jwtUID: any;
  userData: any;
  profileID: any;
  profileSlug: any;
  profileUser: any;
  playData: PCData[];
  pcBio: any;
  pcGroupID: any;
  pcGroupName: any;
  pcUID: any;
  pcUsername: any;
  profileAvatar: any;
  profileType: any;
  voted: boolean = false;
  likeData: any;
  isLiked: any;
  pcLikes: any;
  constructor(
    private authApi: AuthService,
    private toastService: ToastService,
    private routes: ActivatedRoute,
    private formBuilder:FormBuilder,
    private titleService: Title,
    private gainApi: GainzoneService
  ){
    this.token = window.localStorage.getItem('jwt');
    const routeParams = this.routes.snapshot.params;
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
    this.jwtData = authData[1];
    if(this.jwtData){
    this.userID = this.jwtData.data.uid;
    this.userSlug = this.jwtData.data.slug;
    this.jwtUsertype = this.jwtData.data.usertype;
  }});
  this.authApi.fetchUserBySlug(routeParams.slug).subscribe((data: any) => {
  this.userData = data;
  this.profileID = this.userData.uid;
  this.profileAvatar = this.userData.image_path;
  this.profileUser = this.userData.username;
  this.profileSlug = this.userData.slug;
  this.profileType = this.userData.usertype;
  this.titleService.setTitle( "9Forty5 - PlayCaller "+ this.profileUser);
  this.gainApi.fetchPCbyID(this.profileID).subscribe((pcdata: PCData[]) => {
    this.playData = pcdata;
    this.pcUID = this.playData.user_id;
    this.pcUsername = this.playData.username;
    this.pcBio = this.playData.play_bio;
    this.pcGroupID = this.playData.group_id;
    this.pcGroupName = this.playData.group_name;
    this.likeData = [this.userID, this.pcUID];
    this.gainApi.countLikes(this.pcUID).subscribe((count) => {
      this.pcLikes = count;
    })
    this.gainApi.checkLiked(this.likeData).subscribe((res) => {
      this.isLiked = res;
      if(this.isLiked==0){
        this.voted = false;
      }
      else{
        this.voted = true;
      }
    });
  })
  });
  }

  ngOnInit(): void {}

  upVote(){
    if(this.token){
    if(this.voted==false){
      this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      if(this.jwtData){
        this.userID = this.jwtData.data.uid;
      }
      this.gainApi.fetchPCbyID(this.profileID).subscribe((pcdata: PCData[]) => {
        this.playData = pcdata;
        this.pcUID = pcdata.user_id;
        this.likeData = [this.userID, this.pcUID];
        this.pcLikes++;
        this.voted = true;
        this.gainApi.likePlaycaller(this.likeData).subscribe((res) => {
        })
      })
    })
    }
    else if(this.voted==true){
      this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      if(this.jwtData){
        this.userID = this.jwtData.data.uid;
      }
      this.gainApi.fetchPCbyID(this.profileID).subscribe((pcdata: PCData[]) => {
        this.playData = pcdata;
        this.pcUID = pcdata.user_id;
        this.likeData = [this.userID, this.pcUID];
        this.pcLikes--;
        this.voted = false;
        this.gainApi.unlikePlaycaller(this.likeData).subscribe((res) => {
        })
      })
    })
    }
  }else{
    this.toastService.show('Must be logged in to do this.', { classname: 'bg-warning text-light'});
  }
}
}