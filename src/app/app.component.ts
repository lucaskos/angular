import { UserService } from './services/user-service/user.service';
import { Component } from '@angular/core';
import {TokenStorage} from './token-storage';
import { TranslateService } from '@ngx-translate/core';

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
              private tokenStorage: TokenStorage,
              private translate: TranslateService) {
    this.isAdmin = userService.isAdmin();
    translate.setDefaultLang('en');
  }

  get authenticated() {
    return this.userService.isAuthenticated();
  }

  doLogout() {
    console.log('logout');
    this.userService.logout();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
