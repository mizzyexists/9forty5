import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
import { ServerInfo } from '../models/serverinfo';
import { PCData } from '../models/pcdata';

@Injectable({
  providedIn: 'root'
})
export class GainzoneService {
  serverInfo = ServerInfo;
  PHP_API_SERVER = this.serverInfo.phpApiServer;

  constructor(
    private httpClient: HttpClient,
  ) { }

  fetchPCbyID(user_id: number): Observable<PCData[]>{
  return this.httpClient.get<PCData[]>(`${this.PHP_API_SERVER}/gainzone/playcallerbyid?id=${user_id}`);
  }

  createPlaycaller(user: any): Observable<PCData[]>{
  return this.httpClient.post<PCData[]>(`${this.PHP_API_SERVER}/gainzone/makeplaycaller`, user);
  }

  removePlaycaller(user: any): Observable<PCData[]>{
  return this.httpClient.post<PCData[]>(`${this.PHP_API_SERVER}/gainzone/removeplaycaller`, user);
  }

  checkLiked(likedata: any): Observable<PCData[]>{
  return this.httpClient.post<PCData[]>(`${this.PHP_API_SERVER}/gainzone/checkliked`, likedata);
  }

  likePlaycaller(likedata: any): Observable<PCData[]>{
  return this.httpClient.post<PCData[]>(`${this.PHP_API_SERVER}/gainzone/likeprofile`, likedata);
  }

  unlikePlaycaller(likedata: any): Observable<PCData[]>{
  return this.httpClient.post<PCData[]>(`${this.PHP_API_SERVER}/gainzone/unlikeprofile`, likedata);
  }

  countLikes(liked_uid: any): Observable<PCData[]>{
  return this.httpClient.post<PCData[]>(`${this.PHP_API_SERVER}/gainzone/countlikes`, liked_uid);
  }

  checkDisliked(dislikedata: any): Observable<PCData[]>{
  return this.httpClient.post<PCData[]>(`${this.PHP_API_SERVER}/gainzone/checkdisliked`, dislikedata);
  }

  dislikePlaycaller(dislikedata: any): Observable<PCData[]>{
  return this.httpClient.post<PCData[]>(`${this.PHP_API_SERVER}/gainzone/dislikeprofile`, dislikedata);
  }

  undislikePlaycaller(dislikedata: any): Observable<PCData[]>{
  return this.httpClient.post<PCData[]>(`${this.PHP_API_SERVER}/gainzone/undislikeprofile`, dislikedata);
  }

  countDislikes(disliked_uid: any): Observable<PCData[]>{
  return this.httpClient.post<PCData[]>(`${this.PHP_API_SERVER}/gainzone/countdislikes`, disliked_uid);
  }
}
