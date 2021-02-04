import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwtInterceptor';

export const jwtInterceptProviders =[{
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
}];