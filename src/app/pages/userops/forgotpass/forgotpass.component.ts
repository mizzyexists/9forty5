import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AuthData } from 'src/app/models/authdata';
import { ToastService } from '../../../services/toast.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {
  token: any;
  authCheck: any;
  loggedUser: string;
  usertype: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  resetForm: FormGroup;
  resetcode: any;
  forgotPassword: boolean = false;
  recievedCode: boolean = false;
  codeForm: FormGroup;
  username: string;
  constructor(
    private toastService: ToastService,
    private formBuilder:FormBuilder,
    private authApi: AuthService,
    private titleService: Title
  ) {
      this.titleService.setTitle( "9Forty5 - Login" );
      this.resetForm = this.formBuilder.group({
        username: ['', Validators.required],
      });
      this.codeForm = this.formBuilder.group({
      resetcode: ['', Validators.required]
      });
      this.token = window.localStorage.getItem('jwt');
      this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
        this.authCheck = authData
        if(authData && authData[0]==true){
        window.location.href = '/';
      }});
  }

  passReset(){
     const resetData = {
       username: this.resetForm.controls.username.value,
     };
     this.authApi.resetPass(resetData).subscribe((data: any) => {
       if(data==1){
         this.toastService.show('Check your E-mail for your reset code.', { classname: 'bg-success text-light'});
         setTimeout(() => this.recievedCode=true, 500);
         window.localStorage.setItem('reset-user', this.resetForm.controls.username.value);
       }
       else{
         this.toastService.show('User not found. Please check your username and email and try again', { classname: 'bg-danger text-light'});
       }
     });
   }

   checkCode(){
    this.username = window.localStorage.getItem('reset-user');
    const codeData = {
      username: this.username,
      resetcode: this.codeForm.controls.resetcode.value
    };
    this.authApi.checkCode(codeData).subscribe((data: any) =>{
      if(data=='1'){
      this.toastService.show('Your new password has been sent to your inbox.', { classname: 'bg-success text-light'});
      window.localStorage.removeItem('reset-user');
      setTimeout(() => window.location.href = './', 4000);
      }
      else{
      this.toastService.show('Check your code and try again.', { classname: 'bg-danger text-light'});
      }
    });
  }

  ngOnInit(): void {
  }

}
