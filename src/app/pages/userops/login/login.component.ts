import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/models/authdata';
import { ToastService } from '../../../services/toast.service';
import { Title } from '@angular/platform-browser';

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
  forgotPassword: boolean = false;
  recievedCode: boolean = false;
  resetForm: FormGroup;
  resetcode: any;
  codeForm: FormGroup;
  constructor(
    private toastService: ToastService,
    private formBuilder:FormBuilder,
    private authApi: AuthService,
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
  }

  ngOnInit() {}

  onSubmit(){
    if(this.loginForm.invalid){
      return;
    }
    const loginData = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };
    this.authApi.login(loginData).subscribe((data: any) => {
      this.message = data.message;
      if(data.jwt || data.email) {
        window.localStorage.setItem('jwt', data.jwt);
        this.toastService.show('Login Succesful. Please Wait...', { classname: 'bg-dark text-light'});
        setTimeout(() => window.location.href = './', 500);
      }
      else {
        this.toastService.show('Please check your username and password and try again', { classname: 'bg-danger text-light'});
      }
    })
  }
}
