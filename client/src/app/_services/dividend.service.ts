import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

import {Member} from '../_models/member'

@Injectable({
  providedIn: 'root'
})
export class DividendService {

  constructor(private http: Http) { }

  //retrieve dividends
  getDividends() {
    return this.http.get('/api/dividend').pipe(catchError(this.handleError),
    map((res) => res.json()));
  }

  //retrieve dividends by id
  getDividendByMid(id: number) {
    return this.http.get('/api/dividend/'+id).pipe(catchError(this.handleError),
    map((res) => res.json()));
  }
  //retrieve dividends by member id

  //retrieve dividends by group id

  //Post dividends
  //add member method
  addDividend(newDividend: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/dividend', newDividend,{headers:headers}).pipe(catchError(this.handleError),
      map((res) => res.json()));
}  

  //Update 

  // retrieving dividend purpose
  getPurpose() {
    return this.http.get('/api/dividend_purpose').pipe(catchError(this.handleError),
    map((res) => res.json()));
  }

  //capture errors
  private handleError(errorResponse: HttpErrorResponse){
    if (errorResponse.error instanceof ErrorEvent){
      console.error('Client Side Error:', errorResponse.error.message);
    }else{
      console.error('Server Side Error:', errorResponse);
    }
    return throwError('There is an error with the service. Please notify your systems admin if it persists')

  }
}
