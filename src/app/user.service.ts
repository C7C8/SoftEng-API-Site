import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
import { PyAPIResponse, PyAPISubmission, User, UserChange } from './api-data';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  private jwt: string;
  public username: string;
  public admin = false;

  constructor(private http: HttpClient, private router: Router) { }

  async login(username: string, password: string): Promise<PyAPIResponse> {
    const response = await this.http.post<PyAPIResponse>('api.' + document.domain + environment.api.login,
      {
        username: username,
        password: password
      })
      .pipe(catchError(this.handleError()))
      .toPromise();

    if (response.status === 'success') {
      this.jwt = response.access_token;
      this.username = username;
      this.admin = response.admin;
    }

    return response;
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

  async register(username: string, password: string): Promise<PyAPIResponse> {
    return this.http.post<PyAPIResponse>('api.' + document.domain + environment.api.register,
      {
        username: username,
        password: password
      })
      .pipe(catchError(this.handleError()))
      .toPromise();
  }

  async deleteUser(username: string, password: string): Promise<PyAPIResponse> {
    this.logout();
    return this.http.request<PyAPIResponse>('delete', environment.api.deregister,
      {
        body : {
          username: username,
          password: password
        }
      })
      .pipe(catchError(this.handleError()))
      .toPromise();
  }

  logout() {
    this.jwt = null;
    this.username = '';
    this.admin = false;
  }

  getUsername(): string {
    return this.username;
  }

  async createAPI(info: PyAPISubmission): Promise<PyAPIResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.jwt
      })
    };

    return this.http.post<PyAPIResponse>('api.' + document.domain + environment.api.create, info, requestOptions)
      .pipe(catchError(this.handleError()))
      .toPromise();
  }

  async submitUpdate(info: PyAPISubmission): Promise<PyAPIResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.jwt
      })
    };

    return this.http.post<PyAPIResponse>('api.' + document.domain + environment.api.update, info,  requestOptions)
      .pipe(catchError(this.handleError()))
      .toPromise();
  }

  async deleteAPI(id: string): Promise<PyAPIResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.jwt
      })
    };

    return this.http.delete<PyAPIResponse>('api.' + document.domain + environment.api.delete + '?id=' + id, requestOptions)
      .pipe(
        catchError(this.handleError())
      )
      .toPromise();
  }

  async getUsers(): Promise<User[]> {
    if (!this.admin) {
      return [];
    }

    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.jwt
      })
    };

    const response = await this.http.get<PyAPIResponse>('api.' + document.domain + environment.api.userlist, requestOptions)
      .pipe(catchError(this.handleError()))
      .toPromise();

    if (response.status !== 'success') {
      return [];
    }
    return response.users;
  }

  async changeUser(request: UserChange): Promise<PyAPIResponse> {
    if (!this.admin) {
      return;
    }

    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.jwt
      })
    };

    return this.http.post<PyAPIResponse>('api.' + document.domain + environment.api.moduser, request, requestOptions)
      .pipe(catchError(this.handleError()))
      .toPromise();
  }

  async adminDeleteUser(username: string): Promise<PyAPIResponse> {
    if (!this.admin) {
      return;
    }

    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.jwt
      })
    };

    return this.http.delete<PyAPIResponse>('api.' + document.domain + environment.api.deleteuser + '?username=' + username, requestOptions)
      .pipe(catchError(this.handleError()))
      .toPromise();
  }

  async lockUser(username: string, lock: boolean): Promise<PyAPIResponse> {
    if (!this.admin) {
      return;
    }

    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.jwt
      })
    };

    const request: UserChange = { username: username, lock: lock};
    return this.http.post<PyAPIResponse>('api.' + document.domain + environment.api.moduser, request, requestOptions)
      .pipe(catchError(this.handleError()))
      .toPromise();
  }

  private handleError() {
    return (error: HttpErrorResponse): Observable<PyAPIResponse>  => {
      return of(error.error);
    };
  }
}
