import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
import { PyAPIResponse, PyAPISubmission } from './api-data';

class AuthResponse {
  message: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  private apiUrl = environment.apiUrl;
  private jwt: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MzY2MzE0NTYsIm5iZiI6MTUzNjYzMTQ1NiwianRpIjoiZjE4ODk3NWUtZmRhOS00NWEyLThjNzEtYmE3OGQyYzRhYjkyIiwiZXhwIjoxNTM4MzU5NDU2LCJpZGVudGl0eSI6InNvdXJlYyIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.81d9xkXJbWST_8Yv41tpVl_ftFik3omCCjeTlzTc4ZQ';
  public username: string = null;

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
    return (this.jwt !== null && this.jwt !== undefined && this.jwt.length > 0);
  }

  canActivate(): boolean {
    const res = this.isLoggedIn();
    if (!res) {
      this.router.navigate(['/login']);
    }
    return res;
  }

  register(username: string, password: string, callback?: (boolean) => void): void {
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

  submitUpdate(info: PyAPISubmission, callback?: (response: PyAPIResponse) => void) {
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.jwt,
      })
    };

    this.http.post<PyAPIResponse>(this.apiUrl + '/list', info,  requestOptions)
      .pipe(
        catchError(this.handleError())
      )
      .subscribe((response: PyAPIResponse) => {
        if (callback) {
          callback(response !== undefined ? response : {status: 'error', message: 'Submission failed'});
        }
      });
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(operation + ': ' + error.message);
      return of(result as T);
    };
  }
}
