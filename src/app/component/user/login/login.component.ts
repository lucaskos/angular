import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../token-storage';
import { AlertService } from '../../../services/alert-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/internal/operators';
import {BehaviorSubject, empty} from 'rxjs';
import {User} from '../../../user';

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
} )
export class LoginComponent implements OnInit {
  loading = false;
  error = '';
  submitted = false;
  loginForm: FormGroup;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private token: TokenStorage,
              private alertService: AlertService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group( {
      username: [ '', Validators.required ],
      password: [ '', Validators.required ]
    } );
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.userService.login( this.f['username'].value, this.f['password'].value )
      .subscribe(
        data => {
          // localStorage.setItem('currentUser', JSON.stringify(data));
          // this.currentUserSubject.next(data);
          this.router.navigate(['/']);
        },
        error => {
          this.loading = true;
          this.alertService.error(error);
          return empty();
        });
  }


}
