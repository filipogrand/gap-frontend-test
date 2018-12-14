import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpResponse, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Cars } from '../interfaces/cars';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  // handleError Event to catch error on http request
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  // Get JSON from a phisical file and return via http get

  getCars(): Observable<HttpResponse<Cars>> {
    return this.http.get<Cars>(
      environment.api_url, { observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

}
