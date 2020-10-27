import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/models/authdata';
import { ToastService } from '../../../services/toast.service';
import { Title } from '@angular/platform-browser';
import { RecaptchaService } from 'src/app/services/recaptcha.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: any;
  token: any;
  authCheck: any;
  loggedUser: string;
  usertype: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  resetForm: FormGroup;
  resetcode: any;
  codeForm: FormGroup;
  isBanned: string;
  recaptcha: any;
  captchaGRes: any;
  constructor(
    private toastService: ToastService,
    private formBuilder:FormBuilder,
    private authApi: AuthService,
    private recaptchaApi: RecaptchaService,
    private router: Router,
    private titleService: Title
  ){
      this.titleService.setTitle( "9Forty5 - Login" );
      this.token = window.localStorage.getItem('jwt');
      this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.authCheck = authData
      if(authData && authData[0]==true){
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      window.location.href = './';
    };
    });
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.compose([Validators.required])],
        password: ['', Validators.required]
      });
      this.resetForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required]
      });
      this.isBanned = window.localStorage.getItem('isBanned');
  }

  ngOnInit() {}

  resolved(captchaResponse: any[]){
    this.recaptcha = captchaResponse;
    this.recaptchaApi.checkCaptcha(this.recaptcha).subscribe((res) => {
    this.captchaGRes = res;
    if(this.captchaGRes=='1'){
      window.localStorage.setItem('captchaRes', '1');
    }
    else{
    }
    })
  }

  onSubmit(){
    this.captchaGRes = window.localStorage.getItem('captchaRes');
    if(this.loginForm.invalid){
      return this.toastService.show('Invalid Login', { classname: 'bg-danger text-light'});;
    }
    const loginData = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };
    this.authApi.login(loginData).subscribe((data: any) => {
      this.message = data.message;
      if(!this.captchaGRes || this.captchaGRes!='1'){
        this.toastService.show('ReCaptcha Invalid', { classname: 'bg-danger text-light'});
      } else {
        if(this.message=="BANNED"){
          this.toastService.show('You are banned from 9Forty5.', { classname: 'bg-danger text-light'});
          window.localStorage.removeItem('captchaRes');
          window.localStorage.setItem('isBanned', 'true');
          setTimeout(() => window.location.href = './', 1500);
        } else {
        if(data.jwt || data.email && this.captchaGRes=='1') {
          window.localStorage.setItem('jwt', data.jwt);
          this.toastService.show('Login Succesful. Please Wait...', { classname: 'bg-dark text-light'});
          window.localStorage.removeItem('captchaRes');
          setTimeout(() => window.location.href = './', 500);
        }
        else {
          this.toastService.show('Please check your username and password and try again', { classname: 'bg-danger text-light'});
        }
        }
      }
    })
  }
}
