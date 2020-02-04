import {UserService} from '../../../services/user.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorage} from '../../../token-storage';
import {AlertService} from '../../../services/alert-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/internal/operators';
import {BehaviorSubject, empty} from 'rxjs';
import {User} from '../../../user';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loading = false;
    error = '';
    submitted = false;
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private userService: UserService,
                private alertService: AlertService) {
    }

    get f() {
        return this.loginForm.controls;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;

        this.alertService.clear();

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = false;

        this.userService.login(this.f['username'].value, this.f['password'].value)
            .subscribe(
                data => {
                    this.router.navigate(['/']);
                },
                error => {
                    this.loading = true;
                    this.alertService.error(error.error.message);
                    return empty();
                });
    }


}
