import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthData } from 'src/app/models/authdata';
import { GainzoneService } from '../../services/gainzone.service';
import { ToastService } from '../../services/toast.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminopspopup',
  templateUrl: './adminopspopup.component.html',
  styleUrls: ['./adminopspopup.component.scss']
})
export class AdminopspopupComponent implements OnInit {
  pcVerify: any = 0;
  banVerify: any = 0;
  newPCRes: any;
  exPCRes: any;
  closeResult: string;
  NotiTitle: any = "";
  NotiBody: any = "";
  NotiLink: any;
  Noti: any[];
  notiRes: any;
  token: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  selectedUser: any;
  admOpUser: any;
  constructor(
    private authApi: AuthService,
    private gainApi: GainzoneService,
    private toastService: ToastService,
    private notiService: NotificationService,
    private router: Router
  ) {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      if(authData && authData[0]==true){
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      }
    })
  }

  ngOnInit(): void {
    this.refreshSelected(1);
  }

  makePC(uid: any, username: any, usertype: any){
    if(this.jwtUsertype=='Super-Admin' || this.jwtUsertype=='Admin'){
      if(usertype!='Super-Admin' && usertype!='Admin'){
        this.gainApi.createPlaycaller(uid).subscribe((pcRes: any) =>{
          this.newPCRes = pcRes;
          this.toastService.show(username + ' has been promoted to PlayCaller', { classname: 'bg-dark text-light'});
          setTimeout(() => window.location.href = '/', 1000);
        }, (err: any) => this.newPCRes = err);
      }
      else{
        this.toastService.show('You do not have permission to edit that user', { classname: 'bg-danger text-light'});
      }
    }
    else{
      this.toastService.show('You do not have permission to do that', { classname: 'bg-danger text-light'});
    }
  }

  removePC(uid: any, username: any, usertype: any){
    if(this.jwtUsertype=='Super-Admin' || this.jwtUsertype=='Admin'){
      if(usertype!='Super-Admin' && usertype!='Admin'){
        if(this.pcVerify==0){
          alert("You are about to remove PlayCaller from this account! This cannot be undone. If you are sure, please click the 'Remove PlayCaller' button again.");
          this.pcVerify = 1;
        }
        else if(this.pcVerify==1){
          this.gainApi.removePlaycaller(uid).subscribe((pcRes: any) =>{
            this.exPCRes = pcRes;
            this.toastService.show('PlayCaller status has been removed from ' + username, { classname: 'bg-danger text-light'});
            setTimeout(() => window.location.href = '/', 1000);
          }, (err: any) => this.exPCRes = err);
        }
        else{
          console.log("Error with PlayCaller Removal");
        }
      }
      else{
        this.toastService.show('You do not have permission to edit that user', { classname: 'bg-danger text-light'});
      }
    }
    else{
      this.toastService.show('You do not have permission to do that', { classname: 'bg-danger text-light'});
    }
  }

  editUser(){
    this.selectedUser = JSON.parse(localStorage.getItem("admSelectedUser") || "[]");
    this.router.navigate(['/edituser/'+ this.selectedUser.selected_slug]);
  }

  sendNoti(){
    this.selectedUser = JSON.parse(localStorage.getItem("admSelectedUser") || "[]");
    this.Noti = [this.selectedUser.selected_uid, this.NotiTitle, this.NotiBody, this.NotiLink];
    this.notiService.createTestNoti(this.Noti).subscribe((_notiRes: any) =>{
      this.NotiTitle = '';
      this.NotiBody = '';
      this.NotiLink = '';
      this.toastService.show('Notification Sent', { classname: 'bg-dark text-light'});
    }, (err: any) => this.notiRes = err);
  }

  banUser(user: any, usertype: any){
    if(this.jwtUsertype=='Super-Admin' || this.jwtUsertype=='Admin'){
      if(usertype!='Super-Admin' && usertype!='Admin'){
        if(this.banVerify==0){
          alert("You are about to BAN this account! If you are sure, please click the 'Ban User' button again.");
          this.banVerify = 1;
        }
        else if(this.banVerify==1){
          this.authApi.banUser(user).subscribe((_data) => {
            this.toastService.show('You have banned ' + user + '.', { classname: 'bg-danger text-light'});
            setTimeout(() => window.location.href = '/', 1000);
          })
        }
        else{
          console.log("Error with Banning User");
        }
      }
      else{
        this.toastService.show('You do not have permission to ban another admin', { classname: 'bg-danger text-light'});
      }
    }
    else{
      this.toastService.show('You do not have permission to do that', { classname: 'bg-danger text-light'});
    }
  }

  unbanUser(user: any, usertype: any){
    this.authApi.unbanUser(user).subscribe((_data) => {
      this.toastService.show('You have unbanned ' + user + '.', { classname: 'bg-success text-light'});
      setTimeout(() => window.location.href = '/', 1000);
    })
  }

  refreshSelected(number: any){
    if(number==1){
      this.admOpUser = '';
      this.admOpUser = JSON.parse(localStorage.getItem("admSelectedUser") || "[]");
      return true;
    }
  }

  promote2Editor(user){
    this.authApi.makeEditor(user).subscribe((_data) => {
      this.toastService.show('You have promoted ' + user + ' to EDITOR', { classname: 'bg-success text-light'});
      setTimeout(() => window.location.href = '/', 1000);
    })
  }

  removeEditorStatus(user){
    this.authApi.removeEditor(user).subscribe((_data) => {
      this.toastService.show('You have removed EDITOR status from ' + user + '.', { classname: 'bg-success text-light'});
      setTimeout(() => window.location.href = '/', 1000);
    })
  }

  promote2Admin(user){
    this.authApi.makeAdmin(user).subscribe((_data) => {
      this.toastService.show('You have promoted ' + user + ' to ADMIN', { classname: 'bg-success text-light'});
      setTimeout(() => window.location.href = '/', 1000);
    })
  }

  removeAdminStatus(user){
    this.authApi.removeAdmin(user).subscribe((_data) => {
      this.toastService.show('You have removed ADMIN status from ' + user + '.', { classname: 'bg-success text-light'});
      setTimeout(() => window.location.href = '/', 1000);
    })
  }

}
