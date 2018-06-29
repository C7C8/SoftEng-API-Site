import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIFetchService {
  private jsonUrl = environment.apiJson;

  constructor(private http: HttpClient) { }

  getAPIData(): Observable<any> {
    console.log('Fetching data from ' + this.jsonUrl);
    return this.http.get<any>(this.jsonUrl)
      .pipe(
        catchError(this.handleError('getAPIData', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ': ' + error.message);
      return of(result as T);
    };
  }
}
