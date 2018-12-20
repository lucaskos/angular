import { UserService } from '../../../services/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TokenStorage} from "../../../core/TokenStorage";
import {User} from "../../../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  model = new User();
  constructor(
    private router: Router,
    private userService: UserService,
    private token: TokenStorage) { }

  login(): void {
    console.log("Login component");
    console.log('username ' + this.username);
    this.userService.login(this.username, this.password)
      .subscribe(      data => {
          this.token.saveToken(data.token);
          this.router.navigate(['user']);
        }
      );
  }

}
