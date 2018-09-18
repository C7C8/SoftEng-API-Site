import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { API, APIData } from './api-data';

@Injectable({
  providedIn: 'root'
})
export class APIFetchService {

  constructor(private http: HttpClient) { }

  public apiData: APIData = null;
  public userApis: API[] = [];

  getAPIData(callback?: (data: APIData) => void): void {
    this.http.get<APIData>(environment.api.list)
      .pipe(
        catchError(this.handleError(null))
      )
      .subscribe((response: APIData) => {
        this.apiData = response;
        if (callback) {
          callback(response);
        }
      });
  }

  getFilteredAPIs(username: string) {
    // If API data isn't loaded yet, load it, then re-call this function. It's wonderfully recursive, but not infinitely so
    if (this.apiData === null) {
      this.getAPIData((response) => {
        if (response) {
          this.getFilteredAPIs(username);
        }
      });
      return;
    }

    this.userApis = [];
    for (const cls of this.apiData.classes) {
      for (const api of cls.apis) {
        if (api.creator === username) {
          this.userApis.push(api);
        }
      }
    }
  }

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      console.error(error.message);
      return of(result as T);
    };
  }
}
