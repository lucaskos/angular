import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-film-edit',
    templateUrl: './film-edit.component.html',
})
export class FilmCreateComponent {
    filmForm: FormGroup;
    newFilm: string;
    values = '';

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.filmForm = this.fb.group({
            title: '',
            year: '',
            description: '',
            actor: ''
        });
    }

    onSubmit() {
        this.newFilm = JSON.stringify(this.filmForm.value);
        console.log(this.newFilm);
    }
    onKey(value: string) {
        if (value.length > 3) {
            console.log(value);
        }
    }

}
