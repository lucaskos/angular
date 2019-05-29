import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../../services/comment.service';

@Component( {
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: [ './comment.component.css' ]
} )
export class CommentComponent implements OnInit {

  @Input()
  comment: Comment;

  commentForm: FormGroup;

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    console.log( this.comment );

    this.commentForm = new FormGroup( {
      'title': new FormControl( null, [
        Validators.required,
        Validators.minLength( 10 )
      ] ),
      'text': new FormControl( null, [
          Validators.required,
          Validators.minLength( 10 )
        ] )
    } );

  }

  onSubmit() {
    if (this.comment) {
      console.log( this.commentForm.get( 'title' ).value );
      console.log( this.commentForm.get( 'text' ).value );
    }
  }

}
