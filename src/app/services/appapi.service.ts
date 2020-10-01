import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
import { ServerInfo } from '../models/serverinfo';
import { AppData } from '../models/appdata';

@Injectable({
  providedIn: 'root'
})
export class AppapiService {
  serverInfo = ServerInfo;
  PHP_API_SERVER = this.serverInfo.phpApiServer;
  constructor(
      private httpClient: HttpClient,
    ){}

    getAppData(): Observable<AppData[]>{
    return this.httpClient.get<AppData[]>(`${this.PHP_API_SERVER}/appdata/viewappdata`);
    }

    checkAdminCode(code: any): Observable<AppData[]>{
    return this.httpClient.post<AppData[]>(`${this.PHP_API_SERVER}/appdata/checkadmincode`, code);
    }

    checkMaintenance(): Observable<AppData[]>{
    return this.httpClient.get<AppData[]>(`${this.PHP_API_SERVER}/appdata/maintenancecheck`);
    }

    toggleMaintenance(): Observable<AppData[]>{
    return this.httpClient.get<AppData[]>(`${this.PHP_API_SERVER}/appdata/togglemaintenance`);
    }

}
