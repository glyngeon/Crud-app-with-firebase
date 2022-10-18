import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(()=> error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this._http.get(path, {params}).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}, appendToken?: string): Observable<any> {
    // if(appendToken) {
    //   const 
    // }
    return this._http.post(path, body).pipe(catchError(this.formatErrors));
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this._http.patch(path, JSON.stringify(body)).pipe(catchError(this.formatErrors));
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this._http.delete(path, {params}).pipe(catchError(this.formatErrors));
  }
}
