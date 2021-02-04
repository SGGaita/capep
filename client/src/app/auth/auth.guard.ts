import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Router, CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean{
        if (this.auth.isLoggedIn()){
      //this.router.navigateByUrl('/dashboard');
      return true;
    }        
    this.router.navigateByUrl('/login');  
    return false;
   
  }//end canActivate
  
}
  

