import {User} from '../user';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map} from 'rxjs/operators';
import {TokenStorage} from '../token-storage';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AlertService} from './alert-service';
import {Role} from '../classes/role';
import {Film} from '../classes/film';
import {Roles} from '../classes/roles';
import {stringify} from 'querystring';
import {Token} from '../../../Token';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {
    public currentUser: Observable<User>;
    private mainUrl = environment.baseUrl;
    private generateTokenUrl = 'user/signin';
    private tokenName = 'Authorization';
    @Output() getLoggedUser: EventEmitter<any> = new EventEmitter<any>();
    private user: User;
    private roleToken = 'ROLES';
    private currentUserSubject: BehaviorSubject<User>;


    constructor(private http: HttpClient,
                private tokenStorage: TokenStorage,
                private alertService: AlertService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        this.user = this.currentUserSubject.value;
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(this.mainUrl + this.generateTokenUrl, {username, password}, httpOptions)
            .pipe(map(user => {

                for (const key in user) {
                    console.log(key);
                    if (key === 'token') {
                        console.log(user[key]);
                        localStorage.setItem('currentUser', JSON.stringify(user[key].replace('\"','')));
                    }
                }

                // localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                this.getLoggedUser.emit(this.currentUserSubject.value.roles);
                return user;
            }));
    }

    logout() {
        this.getLoggedUser.emit(null);
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    register(user: User) {
        const registerUrl = 'user/register';

        console.log('User : ' + JSON.stringify(user));
        return this.http.post(this.mainUrl + registerUrl, user);
    }

    getUserToken(): any {
        return this.currentUserValue.token;
    }

    getUserRoles(): Roles[] {
        return this.currentUserValue.roles;
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('currentUser');
        if (token != null) {
            return true;
        } else {
            return false;
        }
    }

    hasRole(role: Role): boolean {
        let hasRole = false;
        if (!this.isAuthenticated()) {
            return false;
        }
        this.currentUserValue.roles.forEach(r => {
            // const roleName = r.roleName.substring(r.roleName.indexOf('_') + 1);
            if (stringify(r) === role) {
                hasRole = true;
            }
        });

        return hasRole;
    }

    // isAdmin(): boolean {
    //     let isAdmin = false;
    //     const user = this.getUserToken();
    //     const roles = this.getUserRoles();
    //
    //     if (user !== null && user !== undefined && roles !== null && roles !== undefined) {
    //         const userRole = user.Role;
    //         try {
    //             const role = localStorage.getItem(this.roleToken);
    //             if (roles.match(Role.Admin) !== null) {
    //                 isAdmin = true;
    //             }
    //         } catch (error) {
    //             isAdmin = false;
    //         }
    //     }
    //
    //     return isAdmin;
    // }

    isEmailExists(email: string): Observable<boolean> {
        const apiUrl = this.mainUrl + `user/register/checkEmail/` + email;
        return this.http.get<boolean>(apiUrl);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.mainUrl + `admin/list`);
    }

}
