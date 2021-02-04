import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { LoanRates } from '../_models/loan-rates';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoanRatesService {

  constructor(private http: Http) { }

  // retrieving repay-periods

  getRates() {
    return this.http.get('/api/loan_rates').pipe(catchError(this.handleError),
    map((res) => res.json()));
  }

  
  // get repay-period by branch id
  getRatesById(id: number) {
      return this.http.get('/api/loan_rates/'+id).pipe(catchError(this.handleError),
        map((res) => res.json())); 
  } 

  // get repay-period by branch id
//getRepayPeriods(branch_id_fk: number) {
  //  return this.http.get('/api/loan_repay_terms/'+branch_id_fk).pipe(catchError(this.handleError),
    //  map((res) => res.json())); 
//} 

  //add repay-period method
  addRates(newRates: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/loan_rates', newRates,{headers:headers}).pipe(catchError(this.handleError),
      map((res) => res.json()));
}    

//update
updateRates(id : number, rates: LoanRates){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
  return this.http.put('/api/loan_rates/'+id, rates,{headers:headers}).pipe(catchError(this.handleError));
}

// delete method  
deleteRates (id: any)
{
    return this.http.delete('/api/loan_rates/'+id).pipe(catchError(this.handleError),
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
