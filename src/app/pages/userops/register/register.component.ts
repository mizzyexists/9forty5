import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../../../services/toast.service';
import { AuthData } from 'src/app/models/authdata';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  token: string;
  authCheck: AuthData;
  isBanned: string;
  constructor(
    private formBuilder:FormBuilder,
    private authApi: AuthService,
    private router: Router,
    private titleService: Title,
    private toastService: ToastService
  ) {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
    this.authCheck = authData
    if(authData && authData[0]==true){
    window.location.href = './';
    }})
    this.titleService.setTitle( "9Forty5 - Register" );
    this.registerForm = this.formBuilder.group({
      uid: [],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    });
    this.isBanned = window.localStorage.getItem('isBanned');
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.registerForm.value.username){
      this.toastService.show('No Username', { classname: 'bg-danger text-light'});
    }
    if(!this.registerForm.value.email){
      this.toastService.show('No Email', { classname: 'bg-danger text-light'});
    }
    if(!this.registerForm.value.password){
      this.toastService.show('No Password', { classname: 'bg-danger text-light'});
    }
    if(this.registerForm.value.password && this.registerForm.value.password.length<=5){
      this.toastService.show('Password must be longer than 5 characters', { classname: 'bg-danger text-light'});
    }
    if(this.registerForm.value.username && this.registerForm.value.email && this.registerForm.value.password && this.registerForm.value.password2 && this.registerForm.value.password.length>=6){
      if(this.registerForm.value.password == this.registerForm.value.password2){
    this.authApi.registerUser(this.registerForm.value).subscribe((data)=>{
      if(data[0]==0){
      const loginData = {username: this.registerForm.value.username, password: this.registerForm.value.password};
      this.authApi.login(loginData).subscribe((data: any) => {
        if(data.jwt || data.email) {
          window.localStorage.setItem('jwt', data.jwt);
          this.registerForm.reset();
          setTimeout(() => window.location.href = './', 500);
        }else{
          console.log("An Error Occured");
        }
      })
    }
    else{
      this.toastService.show('User Already Exists.', { classname: 'bg-danger text-light'});
      this.registerForm.reset();
    }
  });}
  else{
    this.toastService.show('Passwords do not match', { classname: 'bg-danger text-light'});
  }
  }
}

}
