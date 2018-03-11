import { UserService } from './services/user.service';
import { Component } from '@angular/core';

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

  constructor(private userService: UserService) {
    this.isAdmin = userService.isAdmin();
  }

  get authenticated() {
    const login = localStorage.getItem('Authorization');
    if (login != null) {
      return true;
    } else {
      return false;
    }
  }

  doLogout() {
    console.log('logout');
    this.userService.logout();
  }
}
