import { UserService } from '../../../services/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TokenStorage} from '../../../token-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private token: TokenStorage,
  ) { }

  ngOnInit() {
    // reset login status
  }

  login() {
    this.loading = true;
    console.log(this.model.username + ' : ' + this.model.password);
    this.userService.login(this.model.username, this.model.password)
      // .subscribe(result => {
      //   if (result === true) {
      //     // login successful
      //     this.router.navigate(['films']);
      //   } else {
      //     // login failed
      //     this.error = 'Username or password is incorrect';
      //     this.loading = false;
      //   }
      // }, error => {
      //   // login failed, error in the stacktrace
      //   this.loading = false;
      //   this.error = 'Username or password is incorrect';
      // });
      .subscribe(
        data => {
           this.token.saveToken(data.token);
           this.router.navigate(['/films']);
        }
      );
  }
}
