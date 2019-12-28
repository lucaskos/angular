import {Component, Input, OnInit, Output} from '@angular/core';
import {CommentService} from '../../../services/comment.service';
import {Film} from '../../../classes/film';
import {Comment} from '../../../classes/comment';
import {Router} from '@angular/router';
import {StorageService} from '../../../services/storage.service';
import {UserService} from '../../../services/user.service';

@Component({
    selector: 'app-comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

    @Input()
    film: Film;
    comments: Comment[];
    @Output()
    comment: Comment;
    showDetail = false;
    showAddComment = false;

    constructor(private router: Router,
                private commentService: CommentService,
                private storageService: StorageService,
                private userService: UserService) {
    }

    ngOnInit() {
        console.log(this.film);

        const comment = new Comment(null, this.film.filmId, 'FILM', null, null, null, null, null, null);
        if (this.film instanceof Film) {
            comment.entityType = 'FILM';
            comment.entityId = this.film.filmId;
        }
        this.commentService.getAllObjectComments(comment).subscribe(
            (result) => {
                this.comments = result;
                console.log(result);
            }
        );

        console.log(this.comments);
    }

    isCommentsExist(): boolean {
        return this.comments !== undefined && this.comments.length > 0;
    }
    commentDetails(comment: Comment) {
        this.showDetail = !this.showDetail;
        this.storageService.setScope(comment);
        this.router.navigate(['/comments/detail/' + comment.id]);
    }

    getShowDetail(): boolean {
        return this.showDetail;
    }

    addComment() {
        if (this.showAddComment) {
            this.showAddComment = false;
        } else {
            this.showAddComment = true;
        }

        return this.showAddComment;
    }
}
