import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/models/authdata';
import { Router, ActivatedRoute } from '@angular/router';
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
    usereditForm: FormGroup;
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
    uploadResponse: any;
    editUser: any = false;
    uploadFilename: any;
    imageuploadform: FormGroup;
    refreshlink: any;
    userName: any;
    userEmail: any;
    jwtUID: any;
    userData: UserData[]
    jwtUsername: any;
    currentPageUsertype: any;
    constructor(
      private authApi: AuthService,
      private toastService: ToastService,
      private routes: ActivatedRoute,
      private formBuilder:FormBuilder,
      private router: Router,
      private uploadService: UploadService,
      private titleService: Title
    ){
    }

    ngOnInit() {
     this.token = window.localStorage.getItem('jwt');
     const routeParams = this.routes.snapshot.params;
     this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
       this.jwtData = authData[1];
       this.userID = this.jwtData.data.uid;
       this.userSlug = this.jwtData.data.slug;
       this.jwtUsertype = this.jwtData.data.usertype;
       if(routeParams.uid==this.jwtUID || this.jwtUsertype == "Super-Admin" || this.jwtUsertype == "Admin"){
       this.authApi.fetchUserBySlug(routeParams.slug).subscribe((userData: UserData[])=>{
       this.userData = userData;
        });
      }});
     this.authApi.fetchUserBySlug(routeParams.slug).subscribe((data: any) => {
     this.profileID = data.uid;
     this.profileUser = data.username;
     this.profileAvatar = data.image_path;
     this.profileType = data.usertype;
     this.profileName = data.fname + " " + data.lname;
     this.profileBio = data.bio_text;
     this.profileLogin = data.last_login;
     this.profileEmail = data.email;
     this.titleService.setTitle( "9Forty5 - "+ this.profileUser + "'s Profile" );
     });
     this.imageuploadform = this.formBuilder.group({
        image_path: [''],
        avatar: ['']
      });
      this.usereditForm = this.formBuilder.group({
          uid: [],
          username: ['', Validators.required],
          email: ['', Validators.required],
          usertype: ['', Validators.required],
          fname: ['', Validators.required],
          lname: ['', Validators.required],
          bio_text: ['', Validators.required],
          image_path: [''],
          avatar: ['']
        });
      this.authApi.fetchUserBySlug(routeParams.slug).subscribe((data: any) => {
      this.usereditForm.patchValue(data);
      this.currentPageUsertype = data.usertype;
      });

   }

   onFileSelect(event: { target: { files: any[]; }; }) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.imageuploadform.get('avatar').setValue(file);
    }
  }

  uploadPic(){
  const formData = new FormData();
  formData.append('avatar', this.imageuploadform.get('avatar').value);
  this.uploadService.uploadFile(formData).subscribe(
    (res) => {this.uploadResponse = res;
    if(!this.uploadResponse.url){
      this.authApi.fetchUserBySlug(this.userSlug).subscribe((data: any) => {
      this.uploadResponse.url = data.image_path;
        this.authApi.addAvatar(this.userID, this.uploadResponse.url).subscribe(() =>{
          this.toastService.show('No Picture Uploaded', { classname: 'bg-danger text-light'});
        });
      });
    }else{
      this.authApi.addAvatar(this.userID, this.uploadResponse.url).subscribe(() =>{
        this.toastService.show('Profile Picture Updated', { classname: 'bg-primary text-light'});
        this.refreshlink = 'profile/' + this.userSlug;
        setTimeout(() => window.location.href = this.refreshlink, 1000);
      });
      }
    });
  }

  editMode(){
  this.editUser = true;
  }

  noeditMode(){
  this.editUser = false;
  }

  onUpdate(){
      this.authApi.editUser(this.usereditForm.value).subscribe(()=>{
        const routeParams = this.routes.snapshot.params;
        this.userID = routeParams.uid;
        this.authApi.fetchUserBySlug(routeParams.slug).subscribe((data: any) => {
          this.userSlug = data.slug;
          this.userName = data.username;
          this.userEmail = data.email;
          this.token = window.localStorage.getItem('jwt');
          this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
            this.jwtData = authData[1];
            this.jwtUID = this.jwtData.data.uid;
            this.jwtUsername = this.jwtData.data.username;
            // if(this.userID!=this.jwtUID){
            // this.mailer.editedUser(this.userName, this.userEmail, this.jwtUsername).subscribe(() => {
            // });}
          });
            this.toastService.show('User Updated', { classname: 'bg-dark text-light'});
            this.refreshlink = 'profile/' + this.userSlug;
            setTimeout(() => window.location.href = this.refreshlink, 1000);
              });
      });
    }


 }
