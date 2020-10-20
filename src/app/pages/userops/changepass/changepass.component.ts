import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AuthData } from 'src/app/models/authdata';
import { Title } from '@angular/platform-browser';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})
export class ChangepassComponent implements OnInit {
  token: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  oldPass: any;
  newPass: any;
  confNewPass: any;
  jwtUID: any;
  newPassData: any;
  message: any;
  constructor(
    private authApi:AuthService,
    private toastService: ToastService,
    private titleService: Title
  ) {
    this.titleService.setTitle( "9Forty5 - Change Password" );
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
    if(!authData || authData[0]!=true){
    window.localStorage.removeItem('jwt');
    window.location.href = '/';
    };
    if(authData && authData[0]==true){
    this.jwtData = authData[1];
    this.jwtUsername = this.jwtData.data.username;
    this.jwtUsertype = this.jwtData.data.usertype;
    this.jwtUID = this.jwtData.data.uid;
    }
    });
  }

  ngOnInit(): void {
  }

  changePass(){
    const loginData = {
      username: this.jwtUsername,
      password: this.oldPass
    };
    this.authApi.login(loginData).subscribe((data: any) => {
      this.message = data.message;
      if(data.jwt || data.email) {
        if(this.newPass!=''){
          if(this.newPass==this.confNewPass){
            this.newPassData = {'uid': this.jwtUID, 'password': this.newPass};
            this.authApi.updatePass(this.newPassData).subscribe();
            this.toastService.show('Password Updated. Refreshing...', { classname: 'bg-dark text-light'});
            setTimeout(() => window.location.href = '/', 1500);
          }else{
            this.toastService.show('New passwords do not match', { classname: 'bg-danger text-light'});
        }
      } else{
        this.toastService.show('Password can not be blank', { classname: 'bg-danger text-light'});

      }
      }
      else {
        this.toastService.show('Old Password Incorrect', { classname: 'bg-danger text-light'});
      }
    })
  }

}
