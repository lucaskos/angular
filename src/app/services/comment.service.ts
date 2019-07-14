import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../classes/comment';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable()
export class CommentService {
  private mainUrl = environment.baseUrl + 'comment';
  private commentPost = '/add';
  private commentGet = '/detail';

  constructor(private httpClient: HttpClient) {
  }

  addComment(comment: Comment): Observable<Comment>  {

    console.log( comment );

    return this.httpClient.post<Comment>( this.mainUrl + this.commentPost, comment, httpOptions );

  }

  getComment(commentId: Number): Observable<Comment> {
    console.log( commentId );

    return this.httpClient.get<Comment>( this.mainUrl + this.commentGet, httpOptions);
  }

}
