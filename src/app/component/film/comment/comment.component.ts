import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../classes/comment';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: [ './comment.component.css' ]
} )
export class CommentComponent implements OnInit {

  @Input()
  comment: Comment;
  @Input()
  object: Object;
  @Input()
  entityType: string;
  commentForm: FormGroup;
  commentDepth = 8;
  savedComment: Comment;

  constructor(private commentService: CommentService,
              private router: Router) {
  }

  ngOnInit() {


    this.commentForm = new FormGroup( {
      'title': new FormControl( null, [
        Validators.required
        // Validators.minLength( 10 )
      ] ),
      'text': new FormControl( null, [
        Validators.required
        // Validators.minLength( 10 )
      ] )
    } );

  }

  onSubmit() {

    if (this.comment) {

      var depth = this.comment.depth;

      if (this.comment.depth < this.commentDepth) {
        depth++;
      }

      const newComment = new Comment(
        null,
        this.comment.entityId,
        'FILM',
        depth,
        this.comment.id,
        this.commentForm.get( 'title' ).value,
        this.commentForm.get( 'text' ).value,
        this.comment.userId );

      this.commentService.addComment( newComment ).subscribe(
        comment => {
          this.comment = comment;
          this.router.navigate([ 'films/', this.comment.entityId ] );
        },
        error => {
          console.log( error );
        }
      );
    }
  }

}
