import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FilmService} from '../../../services/film.service';
import {PersonService} from '../../../services/person.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Comment} from '../../../classes/comment';
import {CommentService} from '../../../services/comment.service';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {
    @Input()
    objectToComment: number;
    @Input()
    objectType: string;
    comment: Comment;
    commentForm: FormGroup;

    constructor(private filmService: FilmService,
                private personService: PersonService,
                private commentService: CommentService,
                private router: Router) {


        this.initializeEmptyCommentForm();
    }

    private initializeEmptyCommentForm() {
        this.commentForm = new FormGroup({
            'title': new FormControl(null,
                [
                    Validators.required,
                    Validators.minLength(5)
                ]
            ),
            'description': new FormControl(null,
                [Validators.minLength(10)]
            )
        });
    }

    ngOnInit() {
        this.initObject();
    }

    initObject() {// todo remove this
        if (this.objectType === 'FILM') {
            console.log('FILM');
            this.filmService.getFilm(this.objectToComment).subscribe(value => {
                console.log(value);
            });
        } else if (this.objectType === 'PERSON') {
            console.log('PERSON');
            this.personService.getPerson(this.objectToComment).subscribe(value => {
                console.log(value);
            });
        } else {
            console.log('ERRROR');
        }
    }

    ngOnDestroy(): void {
        console.log('ngOnDestroy');
        this.initializeEmptyCommentForm();
        this.router.navigate([environment.filmUrl + this.objectToComment]);
    }

    onSubmit() {
        if (this.commentForm.valid) {
            const title = this.commentForm.get('title').value;
            const description = this.commentForm.get('description').value;
            this.comment = new Comment(null, this.objectToComment, this.objectType, null, null, title, description, null, null);
            this.commentService.addComment(this.comment).subscribe(value => {
                this.commentService.setNewCommentAdded(true);
                this.ngOnDestroy();
            });
        }
    }
}
