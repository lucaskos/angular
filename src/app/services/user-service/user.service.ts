import { User } from '../../user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { TokenStorage } from '../../token-storage';
import { Token } from '../../../../Token';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable()
export class UserService {
  private mainUrl = environment.baseUrl;
  private checkEmail = 'user/register/checkEmail/';
  private generateTokenUrl = 'user/signin';
  private tokenName = 'Authorization';
  private user: User;
  private roleToken = 'ROLES';
  private isEmailExist: Observable<boolean>;

  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {
  }

  login(username: string, password: string): Observable<Token> {
    const credentials = {username: username, password: password};

    const observable = this.http.post( this.mainUrl + this.generateTokenUrl, credentials, httpOptions ).pipe(
      catchError( val => of( val ) )
    );
    return observable;
  }

  logout() {
    this.tokenStorage.signOut();
  }

  register(user: User) {
    const registerUrl = 'user/register';

    console.log( 'User : ' + JSON.stringify( user ) );
    return this.http.post( this.mainUrl + registerUrl, user );
  }

  getUserToken(): any {
    return localStorage.getItem( this.roleToken );
  }

  getUserRoles(): String {
    return localStorage.getItem( this.roleToken );
  }

  isAuthenticated(): boolean {
    const token = this.tokenStorage.getToken();
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    let isAdmin = false;
    const user = this.getUserToken();
    const roles = this.getUserRoles();

    if (user !== null && user !== undefined && roles !== null && roles !== undefined) {
      const userRole = user.Role;
      try {
        const role = localStorage.getItem( this.roleToken );
        if (roles.match( 'ROLE_ADMIN' ) !== null) {
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

  isEmailExists(email: string): Observable<boolean> {
    const apiUrl = this.mainUrl + this.checkEmail + email;
    return this.http.get<boolean>( apiUrl );
    // return this.isEmailExist;
  }

}
