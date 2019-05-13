import { Router } from '@angular/router';
import { UserService } from '../../../services/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../../../token-storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../user';

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
              private tokenStorage: TokenStorage) {
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

  register() {
    console.log( this.registerForm )
    this.loading = true;
    if (!this.tokenStorage.getToken() && this.registerForm.valid) {
      this.userService.register( this.formToUserData( this.registerForm ) )
        .subscribe(
          data => {
            this.router.navigate( [ 'login' ] );
          },
          error => {
            this.loading = false;
          },
          () => {
            console.log('complete');
          });
    } else {
      console.log( 'cannot create user form invalid' );
      alert('Error  in form.')
    }
  }

  private isEmailCorrect(control: FormControl): boolean {
    let valid = true;
    this.userService.isEmailExists(control.value).subscribe(
      value => valid = false
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
      form.get('passwords')['controls'].password.value
    );
  }
}
