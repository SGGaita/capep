import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { LoanService } from '../_services/loan.service';
import { MemberService } from '../_services/member.service';
import { SavingsService } from '../_services/savings.service';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../auth/authentication.service';
import { LoanRepay } from '../_models/loan-repay';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit {
  [x: string]: any;
  pageTitle = "CAPEP KENYA : Loan application review"
  _member_id: any;
  loans: any;
  _loan_amount: any;
  _type_name: any;
  _application_date: any;
  _end_date: any;
  member: any;
  _group_name: any;
  _group_code: any;
  _member_name: any;
  _member_id_no: any;
  _membership_no: number;
  _dateJoined: any;
  _loan_status: number;
  _loan_type_name: number;

  _action_date: any;
  _comments: any;
  _total_repay: number;
  dateMsg: any;
  _guarantors: []
  _purpose: []
  loan_repay: LoanRepay;
  loan_repays: LoanRepay[]
  _savings_id_fk:number 
  _dividend_id_fk: number

  //Popover dialogue
  public popoverTitle: string = "Record Delete Confirmation";
  public popoverMessage: string = "Do you really want to delete?";
  public cancelClicked: boolean = false;

  constructor(private location: Location, private auth: AuthenticationService, private route: ActivatedRoute, private router: Router, private loanService: LoanService, private memberService: MemberService, private savingsService: SavingsService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.loanService.getLoansbyLID(id)
        .subscribe(data => {
          console.log("Loan is", data)
          this.loans = data;
          this._member_id = this.loans.map(a => a.member_id);
          this._loan_amount = this.loans.map(a => a.loan_amount);
          this._loan_type_name = this.loans.map(a => a.loan_type_id_fk)
          this._loan_status = this.loans.map(a => a.loan_status)
          this._application_date = this.loans.map(a => a.start_date);
          this._end_date = this.loans.map(a => a.end_date);
          this._action_date = this.loans.map(a => a.action_date);
          this._comments = this.loans.map(a => a._comments);
          this._guarantors = this.loans.map(a => a.guarantorsName)
          this._purpose = this.loans.map(a => a.loan_purpose)
          console.log("This member id is", this._member_id);
          console.log("Guarantors", this._guarantors);

          //null comments
          if (this._comments == "") {
            this._comments = "- No comments provided"
          }

          if (this._application_date == "") {
            this.dateMsg = "Not provided"
          }

          if (this._end_date == "") {
            this.dateMsg = "Not provided"
          }

          if (this._action_date == "") {
            this.dateMsg = "Not provided"
          }


          //fetch member
          this.memberService.getMemberById(this._member_id)
            .subscribe(data => {
              this.member = data;
              console.log(this.member)
              this._group_name = this.member.map(a => { return a.group_name });
              this._group_code = this.member.map(a => { return a.group_code });
              this._member_name = this.member.map(a => { return a.member_name })
              this._member_id_no = this.member.map(a => { return a.member_id_no })
              this._member_name = this.member.map(a => { return a.member_name })
              this._membership_no = +this.member.map(a => { return a.membership_no });
              this._dateJoined = this.member.map(a => { return a.dateJoined });
            })
          //End fetch member

          //Fetch loan repay
          this.loanService.getRepaymentsID(id)
            .subscribe(data => {
              this.loan_repays = data;

              console.log("real loan  amount", this.loan_repays)

              let _loan_bf = +this._loan_amount
              let _temp_loan_bf = _loan_bf;
              console.log("loan amount", _loan_bf)
              console.log("loan amount temp", _temp_loan_bf)
              //calculate loan repayment
              this._total_repay = +this.loan_repays.reduce((result, a) => {
                let _principal_amount = a.principal_amount;
                return result + _principal_amount;
              }, 0);
              console.log("Total repay", this._total_repay)
              let _total_loan_bf = this.loan_repays.map(a => _temp_loan_bf -= a.principal_amount)
              console.log("Loan bf array", _total_loan_bf)
              let _total_loan_repay = +_total_loan_bf

              console.log("Total loan repay", _total_loan_repay)
              this.loan_repays.forEach((p, index) => p._total_bf = _total_loan_bf[index]);
              console.log("Repayments", this.loan_repays)

              //calculate loan balance
              let loan_balance = _loan_bf - _total_loan_repay
              console.log("loan balance", loan_balance)
            })
        })
    })
  }


  //Navigation
  //Savings details
  onSelect(rloans) {

      this.loanService.getRepaymentsRID(rloans.loan_repayment_id)
        .subscribe(data => {
          this.loans = data
          console.log("Array data", data)
          this._savings_id_fk = +this.loans.map(a => a.savings_id_fk);
          this._dividend_id_fk = +this.loans.map(a => a.dividend_id_fk);
          console.log("Savings id from API", this._savings_id_fk)
          console.log("Savings id from list", rloans.savings_id_fk)

         if (this._savings_id_fk > 0) {
            console.log("use saving id")
            console.log("This  loan id is navigate", rloans.savings_id_fk)
            this.router.navigate(['../../savings-update', rloans.savings_id_fk], { relativeTo: this.route });
          } else {
            console.log("use dividend id")
            console.log("This  loan id is navigate", rloans.dividend_id_fk)
            this.router.navigate(['../../dividend-update', rloans.dividend_id_fk], { relativeTo: this.route });
          }

        })
   }

  back() {
    this.location.back()
  }

  removelistElement(rloans) {
    this.loanService.deleteRepayment(rloans.loan_repayment_id)
      .subscribe(data => {
        this.loan_repay = data;
        // this.loan_repay.splice(this.loan_repay.indexOf(rloans), 1);
        this.ngOnInit()
      })
  }

  refresh() {
    this.ngOnInit()
  }



}
