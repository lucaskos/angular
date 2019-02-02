import {User} from '../../user';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {
  private mainUrl = 'http://localhost:8080/token/generate-token';
  private tokenName = 'Authorization';
  private user: User;
  private roleToken = 'ROLES';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<Object> {
    // const login = '/login';
    const credentials = {username: username, password: password};
    const observable = this.http.post('http://localhost:8080/token/generate-token', credentials, httpOptions).pipe(
      catchError(val => of(val))
    );
    return observable;
  }

  logout() {
    localStorage.removeItem(this.tokenName);
    localStorage.removeItem(this.roleToken);
  }

  register(user: User) {
    const registerUrl = '/users/sign-up';

    console.log('User : ' + JSON.stringify(user));
    return this.http.post(this.mainUrl + registerUrl, user);
  }

  getUserToken(): any {
    return localStorage.getItem(this.roleToken);
  }

  getUserRoles(): String {
    return localStorage.getItem(this.roleToken);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenName);

    if (token != null) {
      return true;
    }

    return false;
  }

  isAdmin(): boolean {
    let isAdmin = false;
    const user = this.getUserToken();
    const roles = this.getUserRoles();

    if (user !== null && user !== undefined && roles !== null && roles !== undefined) {
      const userRole = user.Role;
      try {
        const role = localStorage.getItem(this.roleToken);
        if (roles.match('ROLE_ADMIN') !== null) {
          isAdmin = true;
        }
      } catch (error) {
        isAdmin = false;
      }
    }

    return isAdmin;
  }

  isPremium(): boolean {
    let isPremium = false;
    const user = this.getUserToken();
    const roles = this.getUserRoles();

    if (user !== null && user !== undefined && roles !== null && roles !== undefined) {

    }

    return isPremium;

  }

}
