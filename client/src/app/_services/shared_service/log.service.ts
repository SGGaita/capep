import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Logs } from 'src/app/_models/logs';

@Injectable({
  providedIn: 'root'
})
export class LogService {



  constructor(private http: HttpClient) { }

  // retrieving logs

  getLogs()   {
    return this.http.get('/api/logs').pipe(catchError(this.handleError));
  }

   // retrieving logs by userid

   getLogsById(id: number): Observable<Logs> {
    return this.http.get<Logs>('/api/logs/'+id).pipe(catchError(this.handleError));
  }

  //add branch method
  addLog(newLog)  {
     var headers = new HttpHeaders();
     headers.append('Content-Type', 'application/json');
     return this.http.post('/api/logs', newLog,{headers:headers}).pipe(catchError(this.handleError));
 }    

//update
     updateLog(id : number){
     var headers = new HttpHeaders();
     headers.append('Content-Type', 'application/json');
  return this.http.patch('/api/logs/'+id, {headers:headers}).pipe(catchError(this.handleError));
}

 // delete method  
 deleteLog (id: any)
 {
     return this.http.delete('/api/branch/'+id).pipe(catchError(this.handleError)); 
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
