import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../auth/authentication.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  credentials: TokenPayload = {
    //user_id: 0,
    staff_id_fk: 0,
    userName: '',
    email: '',
    password: '',
    roles: ''
  }


  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    //console.log(this.credentials.userName)
  }


}
