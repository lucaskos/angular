import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-film-edit',
    templateUrl: './film-edit.component.html',
})
export class FilmCreateComponent implements OnInit {
    filmForm: FormGroup;
    newFilm: string;
    titleLength = 2;

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.filmForm = new FormGroup({
            'title': new FormControl(null, [
                Validators.required,
                Validators.minLength(this.titleLength)
            ]),
            'year': new FormControl(''),
            'description': new FormControl(''),
            'actor': new FormControl('')
        });
    }

    onSubmit() {
        if (this.filmForm.valid) {
            this.newFilm = JSON.stringify(this.filmForm.value);
            console.log(this.newFilm);
        }
    }

    // metoda bedzie odpowiedzalna za pobieranie wartosci z serwera
    onKey(value: string) {
        if (value.length > 3) {
            console.log(value);
        }
    }

    resetForm() {
        this.createForm();
    }

    get title() { return this.filmForm.get('title'); }
    get year() { return this.filmForm.get('year'); }
    get description() { return this.filmForm.get('description'); }
    get actor() { return this.filmForm.get('actor'); }
}
