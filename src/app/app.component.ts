import { UserService } from './services/user.service';
import { Component } from '@angular/core';
import {TokenStorage} from './token-storage';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  text: string;
  private isAdmin = false;

  constructor(private userService: UserService,
              private tokenStorage: TokenStorage,
              private translate: TranslateService,
              private router: Router) {
    this.isAdmin = userService.isAdmin();
    translate.setDefaultLang('en');
  }

  get authenticated() {
    return this.userService.isAuthenticated();
  }

  doLogout() {
    console.log('logout');
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
