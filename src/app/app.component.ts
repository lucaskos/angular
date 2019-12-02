import {UserService} from './services/user.service';
import {Component} from '@angular/core';
import {TokenStorage} from './token-storage';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {AlertService} from "./services/alert-service";
import {Role} from "./classes/role";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  text: string;
  private isAdmin = this.userService.hasRole(Role.Admin);

  constructor(private userService: UserService,
              private tokenStorage: TokenStorage,
              private translate: TranslateService,
              private router: Router,
              private alertService: AlertService) {
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

  success(message: string) {
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

  info(message: string) {
    this.alertService.info(message);
  }

  warn(message: string) {
    this.alertService.warn(message);
  }

  clear() {
    this.alertService.clear();
  }
}
