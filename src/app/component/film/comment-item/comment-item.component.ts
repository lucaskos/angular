import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { Film } from '../../../classes/film';
import { Comment } from '../../../classes/comment';

@Component( {
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: [ './comment-item.component.css' ]
} )
export class CommentItemComponent implements OnInit {

  @Input()
  film: Film;
  comments: Comment[];

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    console.log( this.film );

    const comment = new Comment( null, this.film.filmId, "FILM", null, null, null, null, null );
    if (this.film instanceof Film) {
      comment.entityType = 'FILM';
      comment.entityId = this.film.filmId;
    }
    this.commentService.getAllObjectComments( comment ).subscribe(
      (result) => {
        this.comments = result
        console.log( result );
      }
    );

    console.log( this.comments );
  }

}
