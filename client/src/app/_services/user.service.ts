import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }
  // retrieving users

  getUsers() {
    return this.http.get('/api/user').pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //get user by id
  getUserById(id: number){
     return this.http.get('/api/user/'+id).pipe(catchError(this.handleError),
     map((res) => res.json())); 
  }

  //add user method
  addUser(newUser: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/user', newUser, { headers: headers }).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }


  // delete method  
  deleteUser(id: any) {
    return this.http.delete('/api/user/' + id).pipe(catchError(this.handleError),
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
