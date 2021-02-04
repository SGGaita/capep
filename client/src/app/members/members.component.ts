import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor( private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
    }
    showMembercreate(){
      this.router.navigate(['create'], {relativeTo: this.route})
    }
  
    showMemberlist(){
      this.router.navigate(['list'], {relativeTo: this.route})
  }

  showSavings(){
    this.router.navigate(['finance'], {relativeTo: this.route})
  }

  showLoans(){
    this.router.navigate(['loans'], {relativeTo: this.route})

  }
 
}
