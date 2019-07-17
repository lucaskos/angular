import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input()
  film: Object;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    console.log(this.film);
    this.commentService.getComment
  }

}
