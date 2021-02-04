import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { HttpErrorResponse } from '@angular/common/http';
import { Loan } from '../_models/loan';
import { LoanType } from '../_models/loan-type';
import { LoanRepay } from '../_models/loan-repay';
import { LoanRates } from '../_models/loan-rates';
import { LoanConditions } from '../_models/loan-conditions';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: Http) { }


  // retrieving loans
  getLoans() {
    return this.http.get('/api/loans').pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  // get loan by member id 
  getloanById(id: number) {
    return this.http.get('/api/loans/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  // retrieving loans by loan id
  getLoansbyLID(id: number) {
    return this.http.get('/api/loansbyLID/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //retrieve new loan by member id
  getLoanNewMid(id:number){
    return this.http.get('/api/loansNewMID/'+id).pipe(catchError(this.handleError),
    map((res)=> res.json()));
  }

  //retrieving New loans
  getNewLoans() {
    return this.http.get('/api/loansNew').pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

//get new loan by  branch
getLoanNewBid(id:number){
  return this.http.get('/api/loansNewBID/'+id).pipe(catchError(this.handleError),
  map((res)=> res.json()));
}

//get accepted loan by  branch
getLoanAccBid(id:number){
  return this.http.get('/api/loansAcceptedBID/'+id).pipe(catchError(this.handleError),
  map((res)=> res.json()));
}
//get declined loan by branch
getLoanDecBid(id:number){
  return this.http.get('/api/loansDeclinedBID/'+id).pipe(catchError(this.handleError),
  map((res)=> res.json()));
}

//get new loan by group
getLoanNewGid(id:number){
  return this.http.get('/api/loansNewGID/'+id).pipe(catchError(this.handleError),
  map((res)=> res.json()));
}

//get accepted loan by group
getLoanAccGid(id:number){
  return this.http.get('/api/loansAcceptedGID/'+id).pipe(catchError(this.handleError),
  map((res)=> res.json()));
}
//get declined loan by group
getLoanDecGid(id:number){
  return this.http.get('/api/loansDeclinedGID/'+id).pipe(catchError(this.handleError),
  map((res)=> res.json()));
}

  //retrieving accepted loans
  getAcceptedLoans() {
    return this.http.get('/api/loansAccepted').pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //retrieving New loans
  getDeclinedLoans() {
    return this.http.get('/api/loansDeclined').pipe(catchError(this.handleError),
      map((res) => res.json()));
  }



  //add loan method
  addLoan(newLoan: any) { 
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/loans', newLoan, { headers: headers }).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //update
  updateLoan(id: number, loan: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/loans/' + id, loan, { headers: headers }).pipe(catchError(this.handleError));
  }

  //update
  updateLoanbyLID(id: number, loan: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/loanbyLID/' + id, loan, { headers: headers }).pipe(catchError(this.handleError));
  }

  //update
  updateDeclineLoanbyLID(id: number, loan: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/loanbyDeclineLID/' + id, loan, { headers: headers }).pipe(catchError(this.handleError));
  }

  //update
  updateLoanbyID(id: number, loan: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/loansbyId/' + id, loan, { headers: headers }).pipe(catchError(this.handleError));
  }

  // delete method  
  deleteLoans(id: any) {
    return this.http.delete('/api/loans/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //LOAN TYPE
  // retrieving groups

  getLoanTypes() {
    return this.http.get('/api/loan_type').pipe(catchError(this.handleError),
      map((res) => res.json()));
  }


  // get group by member id
  getloantypeById(id: number) {
    return this.http.get('/api/loan_type/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //add loan method
  addLoanType(newLoanType: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/loan_type', newLoanType, { headers: headers }).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //update
  updateLoanType(id: number, loantype: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/loan_type/' + id, loantype, { headers: headers }).pipe(catchError(this.handleError));
  }

  // delete method  
  deleteLoanType(id: any) {
    return this.http.delete('/api/loan_type/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //END LOAN TYPES

  //BEGIN LOAN REPAYMENTS
  //Retrieve repayments
  getRepayments() {
    return this.http.get('/api/loan_repay').pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //Retrieve repayments by Member id
  getRepaymentsMID(id: number) {
    return this.http.get('/api/loan_repayMID/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //Retrieve repayments by loan id
  getRepaymentsID(id: number) {
    return this.http.get('/api/loan_repay/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //Retrieve repayments by loan id
  getRepaymentsSID(id: number) {
    return this.http.get('/api/loan_repaySID/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  getRepaymentsRID(id: number) {
    return this.http.get('/api/loan_repayRID/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }


  //Post repayments
  addRepayment(newLoanrepay: any) {
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/loan_repay', newLoanrepay, { headers: headers }).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //Update repayments
  updateRepayment(id: number, loanRepay: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/loan_repay/' + id, loanRepay, { headers: headers }).pipe(catchError(this.handleError));
  }


  //delete Repayments
  deleteRepayment(id: any) {
    return this.http.delete('/api/loan_repay/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  
//loan rates
//get rates
getRates () {
  return this.http.get('/api/loan_rates').pipe(catchError(this.handleError),
  map((res) => res.json()));
}
//update rates
updateRates(rates: any) {
  var headers = new Headers();
    headers.append('Content-Type', 'application/json');
  return this.http.put('/api/loan_rates/', rates, { headers: headers }).pipe(catchError(this.handleError),
  map((res) => res.json()));
}
// delete method  
deleteRates(id: number) {
  return this.http.delete('/api/loan_rates/' + id).pipe(catchError(this.handleError),
  map((res) => res.json()));
}
//get loan conditions
getLoanConditions() {
  return this.http.get('api/loan_conditions').pipe(catchError(this.handleError),
  map((res) => res.json()));
}
//update rates
updateConditions(conditions: any) {
  var headers = new Headers();
    headers.append('Content-Type', 'application/json');
  return this.http.put('/api/loan_conditions/', conditions, { headers: headers }).pipe(catchError(this.handleError),
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










