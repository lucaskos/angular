import { User } from '../user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { TokenStorage } from '../token-storage';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable()
export class UserService {
  public currentUser: Observable<User>;
  private mainUrl = environment.baseUrl;
  private checkEmail = 'user/register/checkEmail/';
  private generateTokenUrl = 'user/signin';
  private tokenName = 'Authorization';
  private user: User;
  private roleToken = 'ROLES';
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorage) {
    this.currentUserSubject = new BehaviorSubject<User>( JSON.parse( localStorage.getItem( 'currentUser' ) ) );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    return this.http.post<any>( this.mainUrl + this.generateTokenUrl, {username, password}, httpOptions )
      .pipe( map( user => {
        localStorage.setItem( 'currentUser', JSON.stringify( user ) );
        this.currentUserSubject.next( user );
        return user;
      } ) );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
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
    const token = localStorage.getItem('currentUser')
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
    const isPremium = false;
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
