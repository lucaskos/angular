import { UserService } from '../../../services/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../token-storage';
import { AlertService } from '../../../services/alert-service/alert-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/internal/operators';

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

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private token: TokenStorage,
              private alertService: AlertService) {
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
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }


}
