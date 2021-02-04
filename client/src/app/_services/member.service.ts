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
export class MemberService {
 
  constructor(private http: Http) { }
  // retrieving groups

          getMembers() {
            return this.http.get('/api/member').pipe(catchError(this.handleError),
            map((res) => res.json()));
          }
 
          // get member by ID method  
        getMemberById(id: number) 
        {
            return this.http.get('/api/member/'+id).pipe(catchError(this.handleError),
              map((res) => res.json())); 
        }
          

         // get member by ID method  
         getMemberByGId(id: number) 
         {
             return this.http.get('/api/member_groupID/'+id).pipe(catchError(this.handleError),
               map((res) => res.json())); 
         }

         //get member name and id by group ID
         getMemberGId(id: number) 
         {
             return this.http.get('/api/memberbyGID/'+id).pipe(catchError(this.handleError),
               map((res) => res.json())); 
         }

          //add member method
          addMember(newMember: any)
          {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this.http.post('/api/member', newMember,{headers:headers}).pipe(catchError(this.handleError),
              map((res) => res.json()));
        }  

        //Update member
        updateMember(id : number,member: Member){
          var headers = new Headers();
          headers.append('Content-Type', 'application/json');
       return this.http.put('/api/member/'+id, member,{headers:headers}).pipe(catchError(this.handleError));
     }


        // delete method  
        deleteMember (id: any)
        {
            return this.http.delete('/api/member/'+id).pipe(catchError(this.handleError),
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
