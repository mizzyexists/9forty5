import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthData } from 'src/app/models/authdata';

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
  pcVerify: any = 0;
  banVerify: any = 0;
  showArrows: boolean;
  admUserInfo: any;
  constructor(
    private authApi: AuthService,
  ) {
    this.offset = 0;
    this.limit = 10;
    this.offsetData = [this.offset, this.limit];
    // this.authApi.getUsers(this.offsetData).subscribe((data) => {
    //   this.users = data;
    // })
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
    if(this.searchTerm != '' && this.searchTerm !=null){
      this.authApi.searchUsers(this.searchQuery).subscribe((data) => {
        this.users = data;
        if(this.users.length > 10){
        this.showArrows = true;
        }
        else{
        this.showArrows = false;
        }
      })
    }
    else{
      this.clearSearch();
    }
  }

  clearSearch(){
    this.offset = 0;
    this.page = 1;
    this.searchTerm = null;
    this.offsetData = [this.offset, this.limit];
    this.users = null;
    // this.authApi.getUsers(this.offsetData).subscribe((data) => {
    //   this.users = data;
    // })
  }

  saveUIDInfo(uid: any, username: any, usertype: any, slug: any, is_playcaller: any){
    this.admUserInfo = {selected_uid: uid, selected_username: username, selected_usertype: usertype, selected_slug: slug, selected_ispc: is_playcaller};
    window.localStorage.setItem('admSelectedUser', JSON.stringify(this.admUserInfo));
  }

  ngOnInit(): void {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      if(authData && authData[0]==true){
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      }
    })
  }

}
