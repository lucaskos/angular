import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../classes/comment';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../services/storage.service';

@Component( {
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: [ './comment.component.css' ]
} )
export class CommentComponent implements OnInit {

  parentComment: Comment;
  comment: Comment;
  id: Number;

  constructor(private storageService: StorageService,
              private commentService: CommentService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.parentComment = <any>this.storageService.getScope();
    this.id = this.parentComment.id;

    console.log( this.parentComment );


    this.commentService.getComment( this.id )
      .pipe().subscribe( c => this.comment = c );


    // this.commentForm = new FormGroup( {
    //   'title': new FormControl( null, [
    //     Validators.required
    //     // Validators.minLength( 10 )
    //   ] ),
    //   'text': new FormControl( null, [
    //     Validators.required
    //     // Validators.minLength( 10 )
    //   ] )
    // } );

  }

  onSubmit() {

    // if (this.comment) {
    //
    //   var depth = this.comment.depth;
    //
    //   if (this.comment.depth < this.commentDepth) {
    //     depth++;
    //   }
    //
    //   const newComment = new Comment(
    //     null,
    //     this.comment.entityId,
    //     'FILM',
    //     depth,
    //     this.comment.id,
    //     this.commentForm.get( 'title' ).value,
    //     this.commentForm.get( 'text' ).value,
    //     this.comment.userId );
    //
    //   this.commentService.addComment( newComment ).subscribe(
    //     comment => {
    //       this.comment = comment;
    //       this.router.navigate([ 'films/', this.comment.entityId ] );
    //     },
    //     error => {
    //       console.log( error );
    //     }
    //   );
    // }
  }

}
