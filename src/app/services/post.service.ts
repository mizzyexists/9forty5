import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
import { ServerInfo } from '../models/serverinfo';
import { PostData } from '../models/postdata';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  serverInfo = ServerInfo;
  PHP_API_SERVER = this.serverInfo.phpApiServer;

  constructor(
    private httpClient: HttpClient,
  ) { }

  newPost(postData: PostData): Observable<PostData>{
  return this.httpClient.post<PostData>(`${this.PHP_API_SERVER}/posts/createpost`, postData);
  }
  getLatestPosts(){
  return this.httpClient.get<PostData>(`${this.PHP_API_SERVER}/posts/getlatestposts`);
  }
  fetchPostBySlug(slug: string): Observable<PostData[]>{
  return this.httpClient.get<PostData[]>(`${this.PHP_API_SERVER}/posts/getpostbyslug?slug=${slug}`);
  }

}
