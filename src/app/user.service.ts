import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
import { PyAPIResponse, PyAPISubmission } from './api-data';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  private jwt: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MzcyOTczMjEsIm5iZiI6MTUzNzI5NzMyMSwianRpIjoiZGQ5MzkyZjktYjNlZC00MTlkLTlhZmYtZjUzNjM2NTY2NWNlIiwiZXhwIjoxNTM5MDI1MzIxLCJpZGVudGl0eSI6ImNybXllcnNAd3BpLmVkdSIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.gYcVlOsjuabfe0ef2-THTvQWdwuKxaV2uAoihYiH_QM';
  public username: string = 'crmyers@wpi.edu';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string, callback?: (boolean) => void): void {
    this.http.post<PyAPIResponse>(environment.api.login,
      {
        username: username,
        password: password
      })
      .pipe(
        catchError(this.handleError(callback)))
      .subscribe(response => {
        if (response.status === 'success') {
          this.jwt = response.access_token;
          this.username = username;

          if (callback) {
            callback(true);
          }
        } else if (callback) {
          callback(false);
        }
    });
  }

  isLoggedIn(): boolean {
    return (this.jwt && this.jwt.length > 0);
  }

  canActivate(): boolean {
    const res = this.isLoggedIn();
    if (!res) {
      this.router.navigate(['/login']);
    }
    return res;
  }

  register(username: string, password: string, callback?: (PyAPIResponse) => void): void {
    this.http.post<PyAPIResponse>(environment.api.register,
      {
        username: username,
        password: password
      })
      .pipe(
        catchError(this.handleError(callback))
      )
      .subscribe(response => {
        callback(response);
      });
  }

  deleteUser(username: string, password: string, callback?: (boolean) => void): void {
    console.log('Deleting user ' + username);
    this.http.request<PyAPIResponse>('delete', environment.api.deregister,
      {
        body : {
          username: username,
          password: password
        }
      }).subscribe(response => {
        console.log(response.message);
        this.logout();
        if (callback) {
          callback(response.status === 'success');
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

  createAPI(info: PyAPISubmission, callback?: (response: PyAPIResponse) => void) {
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.jwt,
      })
    };

    this.http.post<PyAPIResponse>(environment.api.create, info, requestOptions)
      .pipe(catchError(this.handleError()))
      .subscribe((response: PyAPIResponse) => {
        if (callback) {
          callback(response);
        }
      });
  }

  submitUpdate(info: PyAPISubmission, callback?: (response: PyAPIResponse) => void) {
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.jwt,
      })
    };

    this.http.post<PyAPIResponse>(environment.api.update, info,  requestOptions)
      .pipe(
        catchError(this.handleError())
      )
      .subscribe((response: PyAPIResponse) => {
        if (callback) {
          callback(response);
        }
      });
  }

  deleteAPI(id: string, callback?: (response: PyAPIResponse) => void) {
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.jwt,
      })
    };

    this.http.delete<PyAPIResponse>(environment.api.delete + '?id=' + id, requestOptions)
      .pipe(
        catchError(this.handleError(callback))
      )
      .subscribe((response: PyAPIResponse) => {
        if (callback) {
          callback(response !== undefined ? response : { status: 'error', message: 'Submission failed' });
        }
      });
  }

  private handleError (callback?: (PyAPIResponse) => void) {
    return (error: HttpErrorResponse): Observable<PyAPIResponse>  => {
      if (callback) {
        callback(error.error);
      }
      return of(error.error);
    };
  }
}
