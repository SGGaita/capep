import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

import { Saving } from '../_models/saving'

@Injectable({
  providedIn: 'root'
})
export class SavingsService {

  constructor(private http: Http) { }

  // retrieving groups

  getSavings() {
    return this.http.get('/api/savings').pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  // get member by ID method  
  getSavingsById(id: number) {
    return this.http.get('/api/savings/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }
  
  getSavingsBySId(id: number) {
    return this.http.get('/api/savingsSID/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  getSavingsByGId(id: number) {
    return this.http.get('/api/savingsGID/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //add savings method
  addSavings(newSavings: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/savings', newSavings, { headers: headers }).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  addSavingsBF(newSavings: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/savingsBF', newSavings, { headers: headers }).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }
  //update
  updateSavings(id: number, saving: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/savings/' + id, saving, { headers: headers }).pipe(catchError(this.handleError))
  }

  // delete method  
  deleteSavings(id: any) {
    return this.http.delete('/api/savings/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //capture errors
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error:', errorResponse.error.message);
    } else {
      console.error('Server Side Error:', errorResponse);
    }
    return throwError('There is an error with the service. Please notify your systems admin if it persists')

  }

}
