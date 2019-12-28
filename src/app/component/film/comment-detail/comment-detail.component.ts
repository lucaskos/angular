import {Comment} from '../../../classes/comment';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'app-comment-detail',
    templateUrl: './comment-detail.component.html',
    styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit, OnDestroy {
    @Input()
    comment: Comment;

    ngOnInit(): void {
        if (this.comment) {
            console.log(this.comment);
        }
    }

    ngOnDestroy(): void {
        console.log('DESTROY');
    }

}
