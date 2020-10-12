import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { AuthData } from 'src/app/models/authdata';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  usereditForm: FormGroup;
  imageuploadform: FormGroup;
  uploadResponse: any;
  userSlug: any;
  userID: number;
  refreshlink: string;
  userName: any;
  token: string;
  userEmail: any;
  jwtData: any;
  jwtUID: any;
  jwtUsername: any;
  deleteVerify: number = 0;
  localfilename: any;
  jwtUsertype: any;
  userData: any;
  profileID: any;
  profileUser: any;
  profileAvatar: any;
  profileType: any;
  profileName: string;
  profileBio: any;
  profileLogin: any;
  profileEmail: any;
  isDisabled: any = true;
  isLoading: boolean;

  constructor(
    private authApi: AuthService,
    private formBuilder:FormBuilder,
    private toastService: ToastService,
    private uploadService: UploadService,
    private routes: ActivatedRoute,
    private titleService: Title
  ) {
      this.token = window.localStorage.getItem('jwt');
      const routeParams = this.routes.snapshot.params;
      this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
        this.jwtData = authData[1];
        if(this.jwtData){
          this.userID = this.jwtData.data.uid;
          this.userSlug = this.jwtData.data.slug;
          this.jwtUsertype = this.jwtData.data.usertype;
       }else{}
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
        if(this.jwtUsertype=='Super-Admin'){
          this.isDisabled = false;
        this.usereditForm = this.formBuilder.group({
            uid: [],
            username: ['', Validators.required],
            email: ['', Validators.required],
            usertype: [{value: '', disabled: this.isDisabled}, Validators.required],
            fname: ['', Validators.required],
            lname: ['', Validators.required],
            bio_text: ['', Validators.required],
            image_path: [''],
            avatar: ['']
          });
        }
        else if(this.jwtUsertype=='Admin' && this.profileType=='Admin'){
            this.isDisabled = true;
          this.usereditForm = this.formBuilder.group({
              uid: [],
              username: ['', Validators.required],
              email: ['', Validators.required],
              usertype: [{value: '', disabled: this.isDisabled}, Validators.required],
              fname: ['', Validators.required],
              lname: ['', Validators.required],
              bio_text: ['', Validators.required],
              image_path: [''],
              avatar: ['']
            });
        }
        else if(this.jwtUsertype=='Admin' && this.profileType!='Admin' && this.profileType!='Super-Admin'){
          this.isDisabled = false;
          this.usereditForm = this.formBuilder.group({
              uid: [],
              username: ['', Validators.required],
              email: ['', Validators.required],
              usertype: [{value: '', disabled: this.isDisabled}, Validators.required],
              fname: ['', Validators.required],
              lname: ['', Validators.required],
              bio_text: ['', Validators.required],
              image_path: [''],
              avatar: ['']
            });
        }
        else{
          this.isDisabled = true;
          this.usereditForm = this.formBuilder.group({
              uid: [],
              username: ['', Validators.required],
              email: ['', Validators.required],
              usertype: [{value: '', disabled: this.isDisabled}, Validators.required],
              fname: ['', Validators.required],
              lname: ['', Validators.required],
              bio_text: ['', Validators.required],
              image_path: [''],
              avatar: ['']
            });
        }
          this.imageuploadform = this.formBuilder.group({
            image_path: [''],
            avatar: ['']
          });
        this.titleService.setTitle( "9Forty5 - Editing "+ this.profileUser + "'s Profile" );
        this.usereditForm.patchValue(data);
        this.isLoading = false;
        });
      });
      }

  ngOnInit(): void {
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
         this.refreshlink = 'user/' + this.userSlug;

         setTimeout(() => window.location.href = this.refreshlink, 1000);
       });
       }
     });
   }

   onUpdate(){
       this.authApi.editUser(this.usereditForm.getRawValue()).subscribe(()=>{
         this.isLoading = true;
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
             this.refreshlink = 'user/' + this.userSlug;
             setTimeout(() => window.location.href = this.refreshlink, 1000);
               });
       });
     }


         deleteAccount(){
           if(this.deleteVerify==0){
             alert("You are about to delete this account! This cannot be undone. If you are sure, please click the 'Delete Account' button again.");
             this.deleteVerify = 1;
           }
           else if(this.deleteVerify==1){
             this.authApi.deleteAccount(this.profileID).subscribe((res) => {
               alert("All account data has been deleted.");
               if(this.userID==this.profileID){
               window.localStorage.removeItem('jwt');
               window.location.href = "/";
             }
             else{
               window.location.href = "/";
             }
             })
           }
           else{
             console.log("Error with deletion");
           }
         }

         cancelDelete(){
           this.deleteVerify = 0;
         }

}
