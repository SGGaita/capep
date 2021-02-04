import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

showUsercreate () {
    this.router.navigate(['create'], { relativeTo: this.route });
};
showUserlist () {
    this.router.navigate(['list'], { relativeTo: this.route });
};


}
