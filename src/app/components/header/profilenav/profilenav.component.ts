import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/models/authdata';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'app-profilenav',
  templateUrl: './profilenav.component.html',
  styleUrls: ['./profilenav.component.scss']
})
export class ProfilenavComponent implements OnInit {
  token: any;
  data: any;
  jwt: any;
  authCheck: AuthData;
  loggedUser: string;
  usertype: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  image_path: any;
  userID: any;
  userSlug: any;
  jwtEmail: any;
  notiCount: any = 0;
  notiError: any;
  notifications: any;
  constructor(
    private toastService: ToastService,
    private authApi: AuthService,
    private router: Router,
    private notiService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      if(this.jwtData){
        this.jwtUsername = this.jwtData.data.username;
        this.jwtUsertype = this.jwtData.data.usertype;
        this.jwtEmail = this.jwtData.data.email;
        this.jwtUsertype = this.jwtData.data.usertype;
        this.loggedUser = this.jwtUsername;
        this.userID = this.jwtData.data.uid;
        this.userSlug = this.jwtData.data.slug;
        this.authApi.fetchUserBySlug(this.userSlug).subscribe((data: any) => {
        this.image_path = data.image_path;
        this.notiService.countNoti(this.jwtUsername).subscribe((notiCount: any) => {
          this.notiCount = notiCount;
        }, (err:any) => this.notiError = err);
        });
      }else{
      }
    });
  }

  logout() {
    window.localStorage.removeItem('jwt');
    AuthData[0] = false;
    this.loggedUser = null;
    this.toastService.show('You have been logged out', { classname: 'bg-dark text-light'});
    setTimeout(() => window.location.href = './', 500);
  }

  viewMyProfile(){
    this.authApi.fetchUserBySlug(this.userSlug).subscribe((data: any) => {
      this.userSlug = data.slug;
      this.router.navigate(['/profile/' + this.userSlug]);

    });
  }

  goToAM(){
    if(this.jwtUsertype == 'Admin' || this.jwtUsertype == 'Super-Admin'){
      this.router.navigate(['/adminmenu']);
    }
    else {
      alert("YOU CAN NOT DO THAT");
    }
  }
  viewNoti(){
    this.notiService.clearNoti(this.userID).subscribe((data:any) =>{
    })
    this.notiService.getUserNoti(this.userID).subscribe((notifs) => {
      this.notifications = notifs;
      this.notiService.clearStatus(this.userID).subscribe(() => {
      });
    });
      this.notiCount = 0;
  }

  clearNotiList(){
    this.notiService.clearNotiByUser(this.userID).subscribe((data:any) =>{
      this.notifications = "";
      this.toastService.show('Notifications cleared', { classname: 'bg-dark text-light'});
    })
  }
}
