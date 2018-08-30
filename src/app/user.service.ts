import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';

class AuthResponse {
  message: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  private apiUrl = environment.apiUrl;
  private jwt: string;
  public username: string;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string, callback?: (boolean) => void): void {
    console.log('Logging in as ' + username);
    this.username = username;
    this.http.post<AuthResponse>(this.apiUrl + '/auth/login',
      {
        username: username,
        password: password
      })
      .pipe(
        catchError(this.handleError('login', new AuthResponse()))
      )
      .subscribe(response => {
        if (response.message !== undefined && response.message.includes('Logged in')) {
          this.jwt = response.access_token;
          if (callback !== undefined) {
            callback(true);
          }
        } else {
          if (callback !== undefined) {
            callback(false);
          }
        }
    });
  }

  isLoggedIn(): boolean {
    return (this.jwt !== null && this.jwt !== undefined);
  }

  canActivate(): boolean {
    const res = this.isLoggedIn();
    if (!res) {
      this.router.navigate(['/login']);
    }
    return res;
  }

  register(username: string, password: string, callback?: (boolean) => void): void {
    console.log('Registering as ' + username);
    this.http.post<AuthResponse>(this.apiUrl + '/auth/register',
      {
        username: username,
        password: password
      })
      .pipe(
        catchError(this.handleError('register', new AuthResponse()))
      )
      .subscribe(response => {
        if (response.message !== undefined && response.message.includes('registered')) {
          if (callback !== undefined) {
            callback(true);
          }
        } else {
          if (callback !== undefined) {
            callback(false);
          }
        }
      });
  }

  deleteUser(username: string, password: string, callback?: (boolean) => void): void {
    console.log('Deleting user ' + username);
    this.http.request<AuthResponse>('delete', this.apiUrl + '/auth/registration',
      {
        body : {
          username: username,
          password: password
        }
      }).subscribe(response => {
      console.log(response.message);
      this.logout();
      if (callback === undefined) {
        return;
      }
      if (response.message !== undefined && response.message.startsWith('Successfully')) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }

  logout() {
    this.jwt = null;
    this.username = '';
    console.log('Logged out');
  }

  getUsername(): string {
    return this.username;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ': ' + error.message);
      return of(result as T);
    };
  }
}
