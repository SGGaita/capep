import { Component } from '@angular/core';
import { AuthenticationService } from './auth/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CAPEP KENYA ';



  sideBarOpen = true

  constructor(private auth: AuthenticationService) { }
  

  //open sidebar
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }
}
