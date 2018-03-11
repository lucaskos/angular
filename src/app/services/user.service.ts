import { User } from './../user';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
    private mainUrl = 'http://localhost:8080/filmdb';
    private tokenName = 'Authorization';
    private user: User;
    private roleToken = 'ROLES';

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<boolean> {
        const login = '/login';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Expose-Headers', 'Authorization');

        return this.http.post(this.mainUrl + login, JSON.stringify({ username: username, password: password }),
        { headers: headers, observe: 'response' })
            .map((response) => {
                // login successful if there's a jwt token in the response
                const authHeader = response.headers.get('Authorization');
                // const token = response.json() && response.json().token;
                const token = response.headers.get('Authorization');
                const roles = response.headers.get('ROLES');
                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(this.tokenName, token);
                    // return true to indicate successful login
                    console.log('Token set on localStorage :' + localStorage.getItem(this.tokenName));
                    localStorage.setItem(this.roleToken, roles);
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }).catch((err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.error('An error occurred:', err.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
                }

                // ...optionally return a default fallback value so app can continue (pick one)
                // which could be a default value
                // return Observable.of<any>({my: "default value..."});
                // or simply an empty observable
                return new Observable<boolean>();
            });
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
                if (roles.match('ROLE_ADMIN') !== null)  {
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
