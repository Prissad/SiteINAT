import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://inatjunior.tn:8080/article/';
@Injectable({
  providedIn: 'root'
})
export class NewService {

  constructor(private http: HttpClient) { }

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
    // return an observable with a News-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getNews(): Observable<any> {
    return this.http.get(apiUrl + 'all', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getOneNews(id: string): Observable<any> {
    const url = apiUrl + id;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // postNews(data): Observable<any> {
  //   return this.http.post(apiUrl, data, httpOptions).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // updateNews(data, id): Observable<any> {
  //   return this.http.put(`${apiUrl}/${id}`, data, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // deleteNews(id: string): Observable<{}> {
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.delete(url, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
}
