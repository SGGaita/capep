import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

Injectable()

export class JwtInterceptor implements HttpInterceptor {

    constructor(public auth: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //clone http to the custom jwtrequest and send it to the server
        request = request.clone(
            { setHeaders: { Authorization: `Bearer ${this.auth.getToken()}` } }
        )
        return next.handle(request)
    }
}

