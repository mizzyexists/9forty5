import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
import { ServerInfo } from '../models/serverinfo';
import { UserData } from '../models/userdata';
import { AuthData } from '../models/authdata';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverInfo = ServerInfo;
  PHP_API_SERVER = this.serverInfo.phpApiServer;
  username: string;
  password: string;
  token: string;
  jwtData: any;
  usertype: string;
  jwtUsertype: any;
  jwtUsername: any;
  loggedUser: any;
  constructor(
      private httpClient: HttpClient,
    ){}

  registerUser(userData: UserData): Observable<UserData>{
  return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/auth/register`, userData);
  }
  login(loginData: any): Observable<UserData>{
  return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/auth/login`, loginData);
  }
  resetPass(resetData: any){
    return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/mailer/forgotpass`, resetData);
  }
  updatePass(userData: UserData){
  return this.httpClient.put<UserData>(`${this.PHP_API_SERVER}/auth/changepass`, userData);
  }
  checkCode(codeData: any){
    return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/auth/checkcode`, codeData);
  }
  authorize(authData: any): Observable<AuthData>{
  return this.httpClient.post<AuthData>(`${this.PHP_API_SERVER}/auth/protected`, authData);
  }
  fetchUserBySlug(slug: string): Observable<UserData[]>{
  return this.httpClient.get<UserData[]>(`${this.PHP_API_SERVER}/auth/readbyslug?slug=${slug}`);
  }
  addAvatar(uid: number, image_path: string){
    return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/auth/addavatar`, [uid, image_path]);
  }
  editUser(userData: UserData){
    return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/auth/edituser`, userData);
  }
  countUsers(): Observable<UserData[]>{
  return this.httpClient.get<UserData[]>(`${this.PHP_API_SERVER}/auth/countusers`);
  }
  deleteAccount(user: any){
    return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/auth/deleteaccount`, user);
  }
  getUsers(limitdata: any): Observable<UserData[]>{
  return this.httpClient.post<UserData[]>(`${this.PHP_API_SERVER}/auth/getusers`, limitdata);
  }
  searchUsers(limitdata: any): Observable<UserData[]>{
    return this.httpClient.post<UserData[]>(`${this.PHP_API_SERVER}/auth/searchusers`, limitdata);
  }
  banUser(user: any){
    return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/auth/banuser`, user);
  }
  unbanUser(user: any){
    return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/auth/unbanuser`, user);
  }
  makeEditor(user: any){
    return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/auth/promoeditor`, user);
  }
  makeAdmin(user: any){
    return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/auth/promoadmin`, user);
  }
  removeEditor(user: any){
    return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/auth/remeditor`, user);
  }
  removeAdmin(user: any){
    return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/auth/remadmin`, user);
  }
}
