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

}
