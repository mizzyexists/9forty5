import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  constructor(
    private httpClient: HttpClient
  ) { }

  checkCaptcha(captchaData: any): Observable<any>{
  return this.httpClient.post<any>(`https://www.google.com/recaptcha/api/siteverify`, captchaData);
  }
}
