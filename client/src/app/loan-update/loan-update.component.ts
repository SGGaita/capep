import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { LoanService } from '../_services/loan.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GroupService } from '../_services/group.service';
import { LoanRepayPeriodService } from '../_services/loan-repay-period.service';
import { MemberService } from '../_services/member.service';
import { SavingsService } from '../_services/savings.service';

@Component({
  selector: 'app-loan-update',
  templateUrl: './loan-update.component.html',
  styleUrls: ['./loan-update.component.css']
})
export class LoanUpdateComponent implements OnInit {
  pageTitle = "CAPEP KENYA: Loan application";

  //ng select for loan purpose
  loan_purposelist = [{ id: 1, p_name: 'Medical Emergency' }, { id: 2, p_name: 'Debt Consolidation' },
  { id: 3, p_name: 'Travel' }, { id: 4, p_name: 'Education Related' }, { id: 5, p_name: 'Personal Consumption' }
    , { id: 6, p_name: 'Micro Enterprice' }, { id: 7, p_name: 'Other' }];


  loan_types = [{ loan_type_id: 1, loan_type: 'Long term' }, { loan_type_id: 2, loan_type: 'Advance' }];
  marked = false;
  theCheckbox = false;
  maxDate = new Date().toJSON().slice(0, 10);
  minDate = "2019-01-01"

  loanUpdateForm: FormGroup;
  member: any;
  _group_id: any;
  _group_name: any;
  _group_code: any;
  _member_name: any;
  _membership_no: number;
  _member_id_no: any;
  _member_id: number;
  guarantors: any;
  savings: any;
  _savings_total: number;
  _savings_bf: number;
  _total_savings: number;
  loan: any;
  member_id: any;
  _start_date: any;
  _end_date: any;
  _loan_amount: any;
  _loan_type_id: any;
  successMsg: string;
  errorMsg: any;
  _insurance_amount: any;
  loanappForm: any;
  negError: string;
  loan_amountRef: any;
  negDateErr: string;
  start_dateRef: any;
  _loan_fee: any;


  constructor(private location: Location, private router: Router, private title: Title, private groupService: GroupService, private loanService: LoanService, private loanRepayPeriod: LoanRepayPeriodService, private formBuilder: FormBuilder, private memberService: MemberService, private savingsService: SavingsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loanUpdateForm = this.formBuilder.group({
      loan_id: [null],
      savings_bf: [null],
      loans_bf: [null],
      adv_bf: [null],
      loan_limit: [null],
      member_id_fk: [null],
      loan_type_id: [null],
      loan_amount: [{ value: 0 }],
      loan_fee: [0],
      insurance_amount: [{ value: 0 }],
      _insurance_rate: [null],
      loan_purpose: [{ value: null }],
      guarantorsName: [{ value: null }],
      loan_status: [0],
      overide_status: [0],
      repayment_status: [0],
      overide_comments: [null],
      start_date: [{ value: null }],
      end_date: [{ value: null }],
    })

    //load functions
    this.loadMember()
  }

  //fetch member details
  loadMember() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.loanService.getLoansbyLID(id)
        .subscribe(data => {
          console.log("loan infor", data)
          this.loan = data
          this.member_id = this.loan.map(a => a.member_id_fk);
          this._loan_amount = this.loan.map(a => a.loan_amount);
          this._start_date = this.loan.map(a => a.start_date);
          this._end_date = this.loan.map(a => a.end_date);
          this._loan_type_id = this.loan.map(a => a.loan_type_id);
          this._insurance_amount = this.loan.map(a => a.insurance_amount);
          this._loan_fee = this.loan.map(a=>a.loan_fee)

          //patch values
          this.loanUpdateForm.patchValue({
            loan_id: id,
            loan_type_id: this._loan_type_id,
            loan_amount: this._loan_amount,
            start_date: this._start_date,
            end_date: this._end_date,
            insurance_amount: this._insurance_amount,
            loan_fee: this._loan_fee
          })


          //Identity information
          this.memberService.getMemberById(this.member_id)
            .subscribe(data => {
              this.member = data;
              console.log(data)
              this._group_id = this.member.map(function (a) { return a['group_id'] });
              this._group_name = this.member.map(function (a) { return a['group_name']; });
              this._group_code = this.member.map(function (a) { return a['group_code']; });
              this._member_name = this.member.map(function (a) { return a['member_name']; });
              this._membership_no = +this.member.map(function (a) { return a['membership_no']; });
              this._member_id_no = this.member.map(function (a) { return a['member_id_no']; });
              this._member_id = +this.member.map(function (a) { return a['member_id'] });

              //Fetch guarantors
              //fetch the guarantors
              this.memberService.getMemberByGId(this._group_id)
                .subscribe(data => {
                  this.guarantors = data;
                  //console.log("Id at this point is", id)
                  const obj = this.guarantors.find(obj => { return obj.member_id == id });
                  for (var i = 0; i < this.guarantors.length; i++) {
                    if (this.guarantors[i] === obj && obj !== -1) {
                      this.guarantors.splice(i, 1);
                    }
                  }
                })//End   fetch guarantors 

              //Financial information
              //fetch  savings
              this.savingsService.getSavingsById(this.member_id)
                .subscribe(data => {
                  this.savings = data;
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
                  //get default bf
                  let _default_bf = +this.savings.reduce((result, a) => {
                    let default_value = a.default_amount;
                    return result + default_value;
                  }, 0)
                  //Get total savings bf
                  this._total_savings = this._savings_total + this._savings_bf - _default_bf;
                })//End fetch savings     
            })//End fetch member identity
        })
    })
  }


  onFocusDate1(start_date) {
    if (this.loanUpdateForm.value.loan_amount == null) {
      this.negError = "Enter loan amount before selecting date"
      //this.loan_amountRef.nativeElement.focus()
    } else {
      this.negError = ""
    }
  }

  onFocusDate2(end_date) {
    if (this.loanUpdateForm.value.start_date == null) {
      this.negDateErr = "Select the start date"
     // this.start_dateRef.nativeElement.focus()
    } else {
      this.negDateErr = ""
    }
  }

  onChangeDate1(start_date) {
    this.negDateErr = ""
  }

  onChangeDate(end_date) {
    console.log("This is working")
    let _start_date = new Date(this.loanappForm.value.start_date);
    let _end_date = new Date(this.loanappForm.value.end_date);
    let _dateDiff = +_end_date.getMonth() - +_start_date.getMonth()
    // console.log("Month difference", _dateDiff)
    this.loanRepayPeriod.getRepayPeriod()
      .subscribe(data => {
        // console.log("Repay periods", data)

        for (let _repayPeriod of data) {
          if (_dateDiff > _repayPeriod.repay_period) {
            // this.repayperiodMsg ="Loan repayment period should not go beyound "+ _repayPeriod.repay_period + " months"
          } else {
            //this.repayperiodMsg = "This is the repay period"+ _repayPeriod.repay_period
          }
        }
      })
  }

  //submit
  save() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      const updateloan = {
        loan_type_id: this.loanUpdateForm.value.loan_type_id,
        loan_amount: this.loanUpdateForm.value.loan_amount,
        start_date: this.loanUpdateForm.value.start_date,
        end_date: this.loanUpdateForm.value.end_date,
        loan_fee: this.loanUpdateForm.value.loan_fee,
        loan_insurance_rate: this.loanUpdateForm.value.loan_insurance_rate
      }
      this.loanService.updateLoan(id, updateloan)
        .subscribe(results => {
          console.log(results)
          this.successMsg = "Information successfully updated";

          //refresh
          this.ngOnInit()
        },
          error => this.errorMsg = error);
    })



  }


  back() {
    this.location.back()
  }

  refresh() {
    this.ngOnInit()
  }

}
