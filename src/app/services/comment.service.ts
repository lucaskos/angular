import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../classes/comment';

@Injectable()
export class CommentService {
  private mainUrl = environment.baseUrl + 'comment';
  private submitUrl = '/url';

  constructor(private httpClient: HttpClient) {
  }

  addComment(comment: Comment) {

    console.log( comment );

  }

}
