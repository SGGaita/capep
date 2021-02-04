import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {


  }

  showBranchcreate(){
    this.router.navigate(['create'], {relativeTo: this.route})
  }

  showBranchlist(){
    this.router.navigate(['list'], {relativeTo: this.route})
  }

  //refresh
  refresh(){
    this.ngOnInit()
  }


}
