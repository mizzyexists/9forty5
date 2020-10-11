import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
import { LearnTabs } from '../models/learntabs';
import { ServerInfo } from '../models/serverinfo';

@Injectable({
  providedIn: 'root'
})
export class LearninghubService {
  serverInfo = ServerInfo;
  PHP_API_SERVER = this.serverInfo.phpApiServer;

  constructor(
    private httpClient: HttpClient,
  ) { }

  getTabs(){
  return this.httpClient.get<LearnTabs[]>(`${this.PHP_API_SERVER}/learninghub/getlearntabs`);
  }

}
