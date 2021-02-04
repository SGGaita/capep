import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from '../auth/authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;
  

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
   
  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }
  

}
