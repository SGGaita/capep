import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { GroupService } from '../_services/group.service';
import { LoanService } from '../_services/loan.service';

@Component({
  selector: 'app-group-declined-loans',
  templateUrl: './group-declined-loans.component.html',
  styleUrls: ['./group-declined-loans.component.css']
})
export class GroupDeclinedLoansComponent implements OnInit {
  group: any;
  group_name: any;
  branch_name: any;
  loans: any;
  branch_id: number;
  constructor(private title: Title, private route: ActivatedRoute, private router: Router, private groupService: GroupService, private loanService: LoanService, ) { }

  ngOnInit() {
    //get  group name
    this.getgroup()
    //load loans
    this.getLoans()
  }

  //get group name
  getgroup() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.groupService.getGroupById(id)
        .subscribe(data => {
          this.group = data;
          this.group_name = this.group.map(a => a.group_name);
          this.branch_name = this.group.map(a => a.branch_name);
        })
    })
  }

  //get group loans
  getLoans() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.loanService.getLoanDecGid(id)
        .subscribe(data => {
          this.loans = data;
          console.log("Group loans", this.loans)
        })
    })
  }

  //navigation
  acceptedLoans(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      console.log(id)
      this.router.navigate(['../../../group/accepted', id], { relativeTo: this.route });
    })
  }

  newLoans(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.router.navigate(['../../../group/new', id], { relativeTo: this.route });
    })
  }

  back() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.groupService.getGroupById(id)
        .subscribe(data => {
          this.group = data;          
          this.branch_id = +this.group.map(a => a.branch_id);

          this.router.navigate(['../../../branch/new', this.branch_id], { relativeTo: this.route })
        })
    })
  }

  refresh() {
    this.ngOnInit()
  }

}
