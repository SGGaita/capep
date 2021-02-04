import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { Branch } from "../_models/Branch.1";
import { HttpErrorResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class BranchService {
    
  constructor(private http: Http) {}
  
  // retrieving groups

  getBranch()   {
    return this.http.get('/api/branch').pipe(catchError(this.handleError),
    map((res) => res.json()));
  }

   // retrieving branch by id

   getBranchById(id: number): Observable<Branch> {
    return this.http.get('/api/branch/'+id).pipe(catchError(this.handleError),
    map((res) => res.json()));
  }

  //add branch method
  addBranch(newBranch)  {
     var headers = new Headers();
     headers.append('Content-Type', 'application/json');
     return this.http.post('/api/branch', newBranch,{headers:headers}).pipe(catchError(this.handleError),
       map((res) => res.json()));
 }    

//update
     updateBranch(id : number, branch: Branch){
     var headers = new Headers();
     headers.append('Content-Type', 'application/json');
  return this.http.put('/api/log/'+id, branch,{headers:headers}).pipe(catchError(this.handleError));
}

 // delete method  
 deleteBranch (id: any)
 {
     return this.http.delete('/api/branch/'+id).pipe(catchError(this.handleError),
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
