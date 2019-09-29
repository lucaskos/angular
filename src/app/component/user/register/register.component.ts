import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../../../token-storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../user';
import { AlertService } from '../../../services/alert-service';

@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
} )
export class RegisterComponent implements OnInit {
  loading = false;
  registerForm: FormGroup;

  constructor(private userService: UserService,
              private router: Router,
              private tokenStorage: TokenStorage,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup( {
      firstName: new FormControl( null ),
      lastName: new FormControl( null ),
      username: new FormControl( null, [ Validators.required ] ),
      email: new FormControl( null, [ Validators.required, Validators.email, this.isEmailCorrect.bind( this )] ),
      passwords: new FormGroup( {
        password: new FormControl( null, Validators.required ),
        rePassword: new FormControl( null, Validators.required )
      } )
    } );
    // reset login status
  }

  onSubmit() {
    console.log( this.registerForm )

    this.alertService.clear();

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    if (!this.tokenStorage.getToken() && this.registerForm.valid) {
      this.userService.register( this.formToUserData( this.registerForm ) )
        .subscribe(
          data => {
            this.alertService.success('Registration succesful');
            this.router.navigate( [ 'login' ] );
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          },
          () => {
            console.log('complete');
          });
    } else {
      console.log( 'cannot create user form invalid' );
      alert('Error  in form.');
    }
  }

  private isEmailCorrect(control: FormControl): boolean {
    let valid = true;
    this.userService.isEmailExists(control.value).subscribe(
      value => {
        valid = false;
      }, error => {
        this.alertService.info('Email is taken!');
        valid = false;
        }
    );
    return valid;
  }

  private formToUserData(form: FormGroup): User {
    return new User(
      null,
      form.controls.firstName.value,
      form.controls.lastName.value,
      form.controls.email.value,
      form.controls.username.value,
      form.get('passwords')['controls'].password.value,
      null
    );
  }
}
