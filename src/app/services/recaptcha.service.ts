import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
import { ServerInfo } from '../models/serverinfo';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {
  serverInfo = ServerInfo;
  PHP_API_SERVER = this.serverInfo.phpApiServer;
  constructor(
    private httpClient: HttpClient
  ) { }

  checkCaptcha(captchainput: any): Observable<any>{
  return this.httpClient.post<any>(`${this.PHP_API_SERVER}/recaptcha/recaptchaverify`, captchainput);
  }
}
