import { UserService } from './services/user-service/user.service';
import { Component } from '@angular/core';
import {TokenStorage} from './token-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loginLink = '/login';
  logoutLink = '/logout';
  loginText = 'Login';
  logoutText = 'Logout';
  link: string;
  text: string;
  private isAdmin = false;

  constructor(private userService: UserService,
              private tokenStorage: TokenStorage) {
    this.isAdmin = userService.isAdmin();
  }

  get authenticated() {
    return this.userService.isAuthenticated();
  }

  doLogout() {
    console.log('logout');
    this.userService.logout();
  }
}
