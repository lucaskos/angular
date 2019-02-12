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
    this.userService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
           this.token.saveToken(data.token); //todo cast to object
           this.router.navigate(['/films']);
        }
      );
  }
}
