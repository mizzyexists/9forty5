import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { AuthData } from 'src/app/models/authdata';
import { GainzoneService } from '../../services/gainzone.service';
import { ToastService } from '../../services/toast.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  page: any = 1;
  offset: number;
  limit: number;
  offsetData: any;
  users: any;
  previousUsers: any;
  token: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  newPCRes: any;
  exPCRes: any;
  closeResult: string;
  NotiTitle: any = "";
  NotiBody: any = "";
  NotiLink: any;
  Noti: any[];
  notiRes: any;
  searchTerm: any;
  searchQuery: any;
  constructor(
    private authApi: AuthService,
    private titleService: Title,
    private gainApi: GainzoneService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private notiService: NotificationService
  ) {
    this.offset = 0;
    this.limit = 10;
    this.offsetData = [this.offset, this.limit];
    this.authApi.getUsers(this.offsetData).subscribe((data) => {
      this.users = data;
    })
  }

  nextTen(){
    this.previousUsers = this.users
    this.offset = this.offset+10;
    if(!this.searchTerm || this.searchTerm == ''){
      this.offsetData = [this.offset, this.limit];
      this.authApi.getUsers(this.offsetData).subscribe((data) => {
        this.users = data;
        if(this.users.length>0){
          this.page++
        }
        else{
          this.users = this.previousUsers;
        }
      });
    }else{
      this.searchQuery = [this.offset, this.limit, this.searchTerm];
      this.authApi.searchUsers(this.searchQuery).subscribe((data) => {
        this.users = data;
        if(this.users.length>0){
          this.page++
        }
        else{
          this.users = this.previousUsers;
        }
      })
    }
  }

  prevTen(){
    this.previousUsers = this.users
    if(this.page>1){
      this.page--
      this.offset = this.offset-10;
      if(!this.searchTerm || this.searchTerm == ''){
        this.offsetData = [this.offset, this.limit];
        this.authApi.getUsers(this.offsetData).subscribe((data) => {
          this.users = data;
        });
      }else{
        this.searchQuery = [this.offset, this.limit, this.searchTerm];
        this.authApi.searchUsers(this.searchQuery).subscribe((data) => {
          this.users = data;
        })
      }
    }else{
    }
  }

  searchUsers(){
    this.searchQuery = [this.offset, this.limit, this.searchTerm];
    this.authApi.searchUsers(this.searchQuery).subscribe((data) => {
      this.users = data;
    })
  }

  clearSearch(){
    this.offset = 0;
    this.page = 1;
    this.searchTerm = null;
    this.offsetData = [this.offset, this.limit];
    this.authApi.getUsers(this.offsetData).subscribe((data) => {
      this.users = data;
    })
  }

  makePC(uid: any, username: any){
    this.gainApi.createPlaycaller(uid).subscribe((pcRes: any) =>{
      this.newPCRes = pcRes;
      this.toastService.show(username + ' has been promoted to PlayCaller', { classname: 'bg-dark text-light'});
      setTimeout(() => window.location.href = '/directory', 1000);
    }, (err: any) => this.newPCRes = err);
  }

  removePC(uid: any, username: any){
    this.gainApi.removePlaycaller(uid).subscribe((pcRes: any) =>{
      this.exPCRes = pcRes;
      this.toastService.show('PlayCaller status has been removed from ' + username, { classname: 'bg-danger text-light'});
      setTimeout(() => window.location.href = '/directory', 1000);
    }, (err: any) => this.exPCRes = err);
  }

  ngOnInit(): void {
    this.titleService.setTitle( "9Forty5 - User Directory" );
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      if(authData && authData[0]==true){
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      }
    })
  }

  sendNoti(uid: any){
    this.Noti = [uid, this.NotiTitle, this.NotiBody, this.NotiLink];
    this.notiService.createTestNoti(this.Noti).subscribe((_notiRes: any) =>{
      this.NotiTitle = '';
      this.NotiBody = '';
      this.NotiLink = '';
      this.modalService.dismissAll();
      this.toastService.show('Notification Sent', { classname: 'bg-dark text-light'});
    }, (err: any) => this.notiRes = err);
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
