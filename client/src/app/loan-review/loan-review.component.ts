import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { LoanService } from '../_services/loan.service';
import { MemberService } from '../_services/member.service';
import { Title } from '@angular/platform-browser';
import { Member } from '../_models/member';
import { Loan } from '../_models/loan';
import { SavingsService } from '../_services/savings.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-loan-review',
  templateUrl: './loan-review.component.html',
  styleUrls: ['./loan-review.component.css']
})
export class LoanReviewComponent implements OnInit {
  pageTitle = "CAPEP KENYA : Loan application review"

  loanReviewForm: FormGroup;

  _currrency_sym = "KShs."
  myDate = new Date('YYYY-MM-DD');
  _member_id: any;
  member: Member;
  members: Member[]
  loan: Loan;
  loans: Loan[];
  _group_name: string;
  _group_code: string;
  _member_name: string;
  _member_id_no: string;
  _membership_no: number;
  _dateJoined: string;
  _loan_amount: number[];
  _type_name: any[];
  _application_date: Date[];
  _end_date: Date[];
  savings: any;
  _savings_total: number;
  _savings_bf: number;
  _total_savings: any;
  successMsg: string;
  errorMsg: any;
  group_id: number;

  constructor(private route: ActivatedRoute, private router: Router, private loanService: LoanService, private memberService: MemberService, private savingsService: SavingsService, private title: Title, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);


    this.loanReviewForm = this.formBuilder.group({
      loan_amount: [null],
      comments: [null],
      loan_id_fk: [null],
      member_id: [null],
      start_date: [null],
      end_date: [null],
      loan_status_approve: 1,
      loan_status_decline: 2
    })

    //fetch member
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.loanService.getLoansbyLID(id)
        .subscribe(data => {
          console.log("Loan is", data)
          this._member_id = data.map(a => a.member_id)
          console.log("member id is", this._member_id)

          this.loanReviewForm.patchValue({
            loan_id_fk: id,
            member_id: this._member_id
          })

          //fetch loan by member id 
          this.loanService.getLoanNewMid(this._member_id)
            .subscribe(data => {
              console.log("This new loan", data)
              this.loans = data;
              this._loan_amount = this.loans.map(a => a.loan_amount);
              this._type_name = this.loans.map(a => a.type_name)
              this._application_date = this.loans.map(a => a.start_date);
              this._end_date = this.loans.map(a => a.end_date);
            })

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

              //get member savings
              this.savingsService.getSavingsById(this._member_id)
                .subscribe(data => {
                  this.savings = data;
                  console.log("Member savings", this.savings)
                  //get total savings
                  this._savings_total = +this.savings.reduce((result, a) => {
                    var savings_amount = a.savings_amount;
                    return result + savings_amount;
                  }, 0);
                  //get savings bf
                  this._savings_bf = +this.savings.reduce((result, a) => {
                    let savings_bf = a.savings_bf;
                    return result + savings_bf;
                  }, 0);
                  //Get total savings bf
                  this._total_savings = this._savings_total + this._savings_bf
                })
            })


        })
    })
  }

  approvereview() {
    console.log("loan id is", this.loanReviewForm.value.loan_id_fk);
    const updateLoan = {
      //member_id: this.loanReviewForm.value.member_id,
      loan_amount: this.loanReviewForm.value.loan_amount,
      loan_status: this.loanReviewForm.value.loan_status_approve,
      comments: this.loanReviewForm.value.comments,
      action_date: this.myDate
    }
    this.loanService.updateLoanbyLID(this.loanReviewForm.value.loan_id_fk, updateLoan)
      .subscribe(results => {
        console.log("This are the results", results);
        this.successMsg = "Successfully submitted"
        this.loanReviewForm.patchValue({
          loan_amount: null,
          comments: null

        })
      },
        error => this.errorMsg = error);

  }

  declinereview() {
    console.log("loan id is", this.loanReviewForm.value.loan_id_fk);
    const updateLoan = {
      loan_status: this.loanReviewForm.value.loan_status_decline,
      comments: this.loanReviewForm.value.comments,
      action_date: this.myDate
    }
    this.loanService.updateDeclineLoanbyLID(this.loanReviewForm.value.loan_id_fk, updateLoan)
      .subscribe(results => {
        console.log("This are the results", results);
        this.successMsg = "Successfully submitted"
        this.loanReviewForm.patchValue({

          comments: null

        })

      },
        error => this.errorMsg = error
      );

  }

  //navigation
  back() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      console.log(id)
      this.loanService.getLoansbyLID(id)
      .subscribe(data =>{
        console.log(data)
        this.loans = data;
        this.group_id = +this.loans.map(a=> a.group_id)
        this.router.navigate(['../group/new', this.group_id], { relativeTo: this.route })
      })
    })
  }
  //refresh
  refresh() {
    this.ngOnInit()
  }

}
