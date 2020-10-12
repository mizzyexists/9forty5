import { Injectable } from '@angular/core';
import { NotiData } from '../models/notification';
import { HttpClient } from '@angular/common/http';
import { ServerInfo } from '../models/serverinfo';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  serverInfo = ServerInfo;
  PHP_API_SERVER = this.serverInfo.phpApiServer;

  constructor(
    private httpClient: HttpClient,
  ) { }


  createTestNoti(notiData:any){
    return this.httpClient.post<NotiData>(`${this.PHP_API_SERVER}/notify/testnotification`, notiData);
  }

  countNoti(user:any){
  return this.httpClient.post<NotiData[]>(`${this.PHP_API_SERVER}/notify/countnotifications`, user);
  }

  clearNoti(user: any){
  return this.httpClient.post<NotiData[]>(`${this.PHP_API_SERVER}/notify/clearnotifications`, user);
  }

  clearNotiByUser(user:any){
  return this.httpClient.post<NotiData[]>(`${this.PHP_API_SERVER}/notify/clearnotibyuser`, user);
  }

  clearStatus(user: any){
  return this.httpClient.post<NotiData[]>(`${this.PHP_API_SERVER}/notify/clearnotistatus`, user);
  }

  getUserNoti(uid: any){
  return this.httpClient.post<NotiData[]>(`${this.PHP_API_SERVER}/notify/getusernotifications`, uid);
  }

  notifyAdmins(notiData:any){
    return this.httpClient.post<NotiData>(`${this.PHP_API_SERVER}/notify/notifyadmins`, notiData);
  }

}
