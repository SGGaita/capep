import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

import {Staff} from '../_models/staff'

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: Http) { }

  // retrieving groups

  getStaff() {
    return this.http.get('/api/staff').pipe(catchError(this.handleError),
    map((res) => res.json()));
  }

  // get staff by ID method  
getStaffById(id: number) 
{
    return this.http.get('/api/staff/'+id).pipe(catchError(this.handleError),
      map((res) => res.json())); 
}
  

 // get staff by ID method  
 getStaffByGId(id: number) 
 {
     return this.http.get('/api/staffGID/'+id).pipe(catchError(this.handleError),
       map((res) => res.json())); 
 }

 //get staff name and id by group ID
 getStaffGId(id: number) 
 {
     return this.http.get('/api/staffbyGID/'+id).pipe(catchError(this.handleError),
       map((res) => res.json())); 
 }

  //add staff method
  addStaff(newstaff: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/staff', newstaff,{headers:headers}).pipe(catchError(this.handleError),
      map((res) => res.json()));
}  

//Update staff
updateStaff(id : number,staff: Staff){
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
return this.http.put('/api/staff/'+id, staff,{headers:headers}).pipe(catchError(this.handleError));
}


// delete method  
deleteStaff (id: any)
{
    return this.http.delete('/api/staff/'+id).pipe(catchError(this.handleError),
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
