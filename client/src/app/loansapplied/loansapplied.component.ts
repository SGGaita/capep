import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Loan } from '../_models/loan';
import { LoanService } from '../_services/loan.service';
import { SavingsService } from '../_services/savings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from '../_services/branch.service';

@Component({
  selector: 'app-loansapplied',
  templateUrl: './loansapplied.component.html',
  styleUrls: ['./loansapplied.component.css']
})
export class LoansappliedComponent implements OnInit {
  pageTitle = "CAPEP KENYA: Loans Manager";
  loan: Loan;
  loans: Loan[]


  public acceptAction = 1;
  public declineAction = 2;
  myDate = new Date('YYYY-MM-DD');
  savings: any;
  _savings_bf: number;
  Acceptedloans: any;
  Declinedloans: any;
  _member_id_fk: any;
  _loan_type_id_fk: any;
  _loan_amount: any;
  _loan_fee: any;
  _loan_purpose: any;
  _guarantorsName: any;
  _overide_status: any;
  _repayment_status: any;
  _overide_comments: any;
  _comments: any;
  _start_date: any;
  _end_date: any;
  errorMsg: any;
  _savings_total: number;
  total_savings: number;

  _currency_sym = "KShs."
  branchs: any;

  constructor(private router: Router, private route: ActivatedRoute, private title: Title, private branchService: BranchService, private loanService: LoanService, private savingsService: SavingsService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    //get branches
    this.getBranches()
    //loans
    //this.getLoans()
    //new loans
    //this.getNewLoan();
    //accepted loans
    //this.getAcceptedLoan();
    //declined loans
    // this.getDeclinedloan();
  }

  //fetch branches
  getBranches() {
    this.branchService.getBranch()
      .subscribe(data => {
        this.branchs = data;
      })
  }

  //fetch loans
  getLoans() {
    this.loanService.getLoans()
      .subscribe(data => {
        this.loans = data;
        console.log("This loans 1", this.loans)
      })
  }

  getNewLoan() {
    this.loanService.getNewLoans()
      .subscribe(data => {
        this.loans = data;
        console.log("This loans 2", this.loans)

        //count new loan
      });
  };

  getAcceptedLoan() {

    this.loanService.getAcceptedLoans()
      .subscribe(data => {
        console.log("Accepted loans", data)
        this.Acceptedloans = data;
      });
  };

  getDeclinedloan() {
    this.loanService.getDeclinedLoans()
      .subscribe(data => {
        this.Declinedloans = data;
      });
  };


  //Navigation
  //New branch loans
  newLoan(branch) {
    console.log(branch.branch_id)
    this.router.navigate(['../branch/new', branch.branch_id], { relativeTo: this.route });
  }
  //Accepted loans
  acceptedLoan(branch) {
    console.log(branch.branch_id)
    this.router.navigate(['../branch/accepted', branch.branch_id] ,{ relativeTo: this.route });
  }
  //declined Loans
  declinedLoan(branch) {
    console.log(branch.branch_id)
    this.router.navigate(['../branch/declined', branch.branch_id], { relativeTo: this.route });
  }
  //default loans
  defaultLoan(branch) {
    console.log(branch.branch_id)
    this.router.navigate(['../branch/defaulted', branch.branch_id], { relativeTo: this.route });
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
            this.getAcceptedLoan();
            this.getNewLoan()
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
            this.getDeclinedloan()
            this.getNewLoan()
          },
            error => this.errorMsg = error);
      });
  };

  onSelectLoans(loan) {
    //window.alert("This loan is" + loan.loan_id)
    this.router.navigate(['../', loan.loan_id], { relativeTo: this.route });
  };

  onSelectLoansDecline(loan) {
    this.router.navigate(['../decline', loan.loan_id], { relativeTo: this.route });
  }

  refresh(){
    this.ngOnInit()
  }

}
