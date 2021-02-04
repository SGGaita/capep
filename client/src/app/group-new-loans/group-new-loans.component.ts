import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { LoanService } from '../_services/loan.service';
import { Title } from '@angular/platform-browser';
import { BranchService } from '../_services/branch.service';
import { GroupService } from '../_services/group.service';

@Component({
  selector: 'app-group-new-loans',
  templateUrl: './group-new-loans.component.html',
  styleUrls: ['./group-new-loans.component.css']
})
export class GroupNewLoansComponent implements OnInit {
  loans: any;
  public acceptAction = 1;
  public declineAction = 2;
  myDate = new Date('YYYY-MM-DD');
  errorMsg: any;
  branch: any;
  group: any;
  group_name: any;
  branch_name: any;
  branch_id: any;

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
      this.loanService.getLoanNewGid(id)
        .subscribe(data => {
          this.loans = data;
          console.log("Group loans", this.loans)
        })
    })
  }

  onAccept(loan) {

    console.log("loan id is", loan.loan_id);
    const updateLoan = {
      loan_status: this.acceptAction,
      action_date: this.myDate
    }
    this.loanService.updateLoanbyID(loan.loan_id, updateLoan)
      .subscribe(results => {
        console.log("This are the results", results);
        this.loanService.getNewLoans()
          .subscribe(data => {
            this.loans = data;
            this.ngOnInit()
          },
            error => this.errorMsg = error);
      });
  };

  onDecline(loan) {
    console.log("loan id is", loan.loan_id);
    const updateLoan = {
      loan_status: this.declineAction,
      action_date: this.myDate
    }
    this.loanService.updateLoanbyID(loan.loan_id, updateLoan)
      .subscribe(results => {
        console.log("This are the results", results);
        this.loanService.getNewLoans()
          .subscribe(data => {
            this.loans = data;
            this.ngOnInit()
          },
            error => this.errorMsg = error);
      });
  };

  //navigation
  declinedLoans(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      console.log(id)
      this.router.navigate(['../../../group/declined', id], { relativeTo: this.route });
    })
  }

  acceptedLoans(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.router.navigate(['../../../group/accepted', id], { relativeTo: this.route });
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

  //loan review
  onSelectLoans(loan) {
    //window.alert("This loan is" + loan.loan_id)
    this.router.navigate(['../../../', loan.loan_id], { relativeTo: this.route });
  };


  refresh() {
    this.ngOnInit()
  }

}
