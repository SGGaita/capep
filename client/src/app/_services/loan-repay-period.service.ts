import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { LoanRepayPeriod } from '../_models/loan-repay-period';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoanRepayPeriodService {

  constructor(private http: Http) { }

  // retrieving repay-periods

  getRepayPeriod() {
    return this.http.get('/api/loan_repay_terms').pipe(catchError(this.handleError),
    map((res) => res.json()));
  }

  
  // get repay-period by branch id
  getRepayPeriodById(id: number) {
      return this.http.get('/api/loan_repay_terms/'+id).pipe(catchError(this.handleError),
        map((res) => res.json())); 
  } 

  // get repay-period by branch id
//getRepayPeriods(branch_id_fk: number) {
  //  return this.http.get('/api/loan_repay_terms/'+branch_id_fk).pipe(catchError(this.handleError),
    //  map((res) => res.json())); 
//} 

  //add repay-period method
  addRepayPeriod(newRepayPeriod: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/loan_repay_terms', newRepayPeriod,{headers:headers}).pipe(catchError(this.handleError),
      map((res) => res.json()));
}    

//update
    updateRepayPeriod(id : number, repayPeriod: LoanRepayPeriod){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
  return this.http.put('/api/loan_repay_terms/'+id, repayPeriod,{headers:headers}).pipe(catchError(this.handleError));
}

// delete method  
deleteRepayPeriod (id: any)
{
    return this.http.delete('/api/loan_repay_terms/'+id).pipe(catchError(this.handleError),
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
