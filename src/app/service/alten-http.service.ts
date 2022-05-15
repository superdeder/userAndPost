import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interface/user.interface";
import {Post} from "../interface/post.interface";

@Injectable({
  providedIn: 'root'
})
export class AltenHttpService {

  constructor(private httpClient : HttpClient) {}

  private readonly usersList = 'https://jsonplaceholder.typicode.com/users';
  private readonly postsList = 'https://jsonplaceholder.typicode.com/posts';

  // Servizio che torna lista User
  public getUsersList(): Observable<User[]> {
    return <Observable<any>>this.httpClient.get(this.usersList);
  }

  // Servizio che torna lista Post
  public getPostList(): Observable<Post[]> {
    return <Observable<any>>this.httpClient.get(this.postsList);
  }

  // Servizio che torna singolo Post tramite id in param
  public getSinglePost(idPost: number): Observable<Post[]> {
    let params = new HttpParams();
    params = params.append('id', idPost);
    return <Observable<any>>this.httpClient.get(this.postsList, {params: params});
  }

  // Servizio che torna singolo User tramite id in param
  public getSingleUser(idUser: number): Observable<User[]> {
    let params = new HttpParams();
    params = params.append('id', idUser);
    return <Observable<any>>this.httpClient.get(this.usersList, {params: params});
  }


}
