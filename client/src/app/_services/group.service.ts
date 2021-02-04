import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { Group } from '../_models/group';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: Http) { }
  // retrieving groups

  getGroup() {
    return this.http.get('/api/group').pipe(catchError(this.handleError),
      map((res) => res.json()));
  }


  // get group by branch id
  getGroupById(id: number) {
    return this.http.get('/api/groupID/' + id).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  // get group by branch id
  getGroups(branch_id_fk: number) {
    return this.http.get('/api/group/' + branch_id_fk).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //add group method
  addGroup(newGroup: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/group', newGroup, { headers: headers }).pipe(catchError(this.handleError),
      map((res) => res.json()));
  }

  //update
  updateGroup(id: number, group: Group) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/group/' + id, group, { headers: headers }).pipe(catchError(this.handleError));
  }

  // delete method  
  deleteGroups(id: any) {
    return this.http.delete('/api/group/' + id).pipe(catchError(this.handleError),
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
