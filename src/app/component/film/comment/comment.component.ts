import {Component, Input, OnInit} from '@angular/core';
import {Film} from '../../../classes/film';
import {Person} from '../../../classes/person';
import {FilmService} from '../../../services/film.service';
import {PersonService} from '../../../services/person.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

    @Input()
    objectToComment: number;
    @Input()
    objectType: string;

    commentForm: FormGroup;

    constructor(private filmService: FilmService,
                private personService: PersonService) {
        this.commentForm = new FormGroup({
            'title': new FormControl([
                Validators.required,
                Validators.minLength(10)
            ]),
            'description': new FormControl([Validators.minLength(10)])
        });
    }

    ngOnInit() {
        this.initObject();
    }

    initObject() {
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

    onSubmit() {
        console.log(this.commentForm);
    }
}
