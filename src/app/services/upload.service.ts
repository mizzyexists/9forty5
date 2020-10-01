import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerInfo } from '../models/serverinfo';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  serverInfo = ServerInfo;
  PHP_API_SERVER = this.serverInfo.phpApiServer;

  constructor(private httpClient: HttpClient) { }

  uploadFile(data: FormData) {
    let uploadURL = `${this.PHP_API_SERVER}/fileupload/profileupload`;
    return this.httpClient.post<any>(uploadURL, data);
  }

}
