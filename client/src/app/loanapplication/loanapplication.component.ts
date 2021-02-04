import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

//Import Services
import { LoanService } from '../_services/loan.service';
import { MemberService } from '../_services/member.service'

//Import Models
import { Loan } from '../_models/loan';
import { Member } from '../_models/member'
import { SavingsService } from '../_services/savings.service';
import { Saving } from '../_models/saving';
import { GroupService } from '../_services/group.service';
import { Title } from '@angular/platform-browser';
import { LoanRates } from '../_models/loan-rates';
import { LoanRepayPeriodService } from '../_services/loan-repay-period.service';


@Component({
  selector: 'app-loanapplication',
  templateUrl: './loanapplication.component.html',
  styleUrls: ['./loanapplication.component.css']
})
export class LoanapplicationComponent implements OnInit {
  @ViewChild('loan_amount', { static: false }) loan_amountRef: ElementRef;
  @ViewChild('start_date', { static: false }) start_dateRef: ElementRef;

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
  overide_value = 1;

  loanappForm: FormGroup;

  loan: Loan;
  loans: Loan[];
  member: Member;
  members: Member[];
  rate: LoanRates;
  rates: LoanRates[]
  member_dets: any;
  _group_name: any;
  _group_code: any;
  _group_officer: any;
  _member_name: any;
  _membership_no: any;
  _member_id_no: any;
  _savings_bf: any;

  saving: Saving;
  savings: Saving[];

  savings_total: any;
  _group_id: any;
  loan_t: string;
  amount: any;
  feedback: string;
  negFeedback: string;
  successMsg: string;
  errorMsg: any;
  _savings_total: number;
  _total_savings: any;
  loanrepays: any;
  _total_repay: number;
  _loan_bf: number;
  lrates: any;
  _loan_interest: number;
  _adv_bf: number;
  _adv_loan_interest: number;
  _member_id: number;
  guarantors: any;
  _mID: any;
  negError: string;
  conditions: any;
  group: any;
  _group_reg_date: any;
  conditionsFeedback: string;
  _pendingMsg: string;
  _pendingAdvMsg: string;
  _pendingLoansMsg: string;
  repayperiodMsg: string;
  negDateErr: string;
  x: number;
  _default_amount: number;
  _adv_default_amount: number;
  _date = new Date();
  _new_loan: boolean = false
  _default_amount_2: number;
  _payment_amount: number;
  _total_payment: number;
  _total_payment_2: number;
  new_active: boolean = false;
  _default: boolean = false;
  new_active_adv: boolean = false;
  adv_default: boolean = false;
  adv_bf: number;


  constructor(private spinner: NgxSpinnerService, private router: Router, private title: Title, private groupService: GroupService, private loanService: LoanService, private loanRepayPeriod: LoanRepayPeriodService, private formBuilder: FormBuilder, private memberService: MemberService, private savingsService: SavingsService, private route: ActivatedRoute) {

  }


  //checkbox
  toggleVisibility(e) {
    this.marked = e.target.checked;
    if (this.marked) {
      var o_status = 1;
      this.loanappForm.patchValue({
        overide_status: o_status
      });
      // this.formEnable();
    }
    else {
      var o_status = 0;
      this.loanappForm.patchValue({
        overide_status: o_status
      });
    }
    //this.formDisable();
  };


  ngOnInit() {
    this.title.setTitle(this.pageTitle)
    this.spinner.show()

    this.loanappForm = this.formBuilder.group({
      savings_bf: [null],
      loans_bf: [null],
      adv_bf: [null],
      loan_limit: [null],
      member_id_fk: [null],
      loan_type_id: [null],
      loan_amount: [{ value: 0, disabled: true }],
      loan_fee: [{ value: null, disabled: true }],
      loan_insurance_rate: [{ value: 0, disabled: true }],
      _insurance_rate: [null],
      loan_purpose: [{ value: null, disabled: true }],
      guarantorsName: [{ value: null, disabled: true }],
      loan_status: [0],
      overide_status: [0],
      repayment_status: [0],
      overide_comments: [null],
      start_date: [{ value: null, disabled: true }],
      end_date: [{ value: null, disabled: true }],
      adv_loan_interest: [null]
    }); //end form builder


    //! fetch member by ID
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      //get member details
      this.memberService.getMemberById(id)
        .subscribe(data => {
          this.member = data;
          //! member personal details
          this._group_id = this.member.map(function (a) { return a['group_id']; });
          this._group_name = this.member.map(function (a) { return a['group_name']; });
          this._group_code = this.member.map(function (a) { return a['group_code']; });
          this._member_id = +this.member.map(a => a.member_id);
          //this._group_officer = this.member.map(function (a) { return a['group_officer']; });
          this._member_name = this.member.map(function (a) { return a['member_name']; });
          this._membership_no = +this.member.map(function (a) { return a['membership_no']; });
          this._member_id_no = this.member.map(function (a) { return a['member_id_no']; });
          //patch member id to hidden member id element
          //patch member id to form 
          this.loanappForm.patchValue({
            member_id_fk: this._member_id
          })

          //fetch the guarantors
          this.memberService.getMemberByGId(this._group_id)
            .subscribe(data => {
              this.guarantors = data;
              //console.log("Id at this point is", id)
              const obj = this.guarantors.find(obj => { return obj.member_id == id });
              for (var i = 0; i < this.guarantors.length; i++) {
                if (this.guarantors[i] === obj && obj !== -1) {
                  this.guarantors.splice(i, 1);
                } //end if
              } //end for
            })//end fetch guarantors



          //!fetch member savings
          this.savingsService.getSavingsById(id).subscribe(s => {
            this.savings = s
            //get total savings
            this._savings_total = +this.savings.reduce((result, a) => {
              let savings_amount = a.savings_amount;
              return result + savings_amount;
            }, 0);
            //get savings bf if there is any savings is found in the savings bf column in DB
            this._savings_bf = +this.savings.reduce((result, a) => {
              let savings_bf = a.savings_bf;
              return result + savings_bf
            }, 0); //end savings bf
            //get savings default value from default bf column in DB
            let _default_bf = +this.savings.reduce((result, a) => {
              let default_value = a.default;
              return result + default_value
            }, 0)
            //get total savings bf
            this._total_savings = this._savings_total + this._savings_bf - _default_bf;
            console.log("Total savings", this._total_savings)
          })//!End savings fetch 

          //! fetch insurance rate
          this.loanService.getRates()
            .subscribe(data => {
              this.lrates = data;
              let _insurance_rate = this.lrates.map(a => a.insurance_rate)
              console.log("Insurance rate", _insurance_rate)

              this.loanappForm.patchValue({
                _insurance_rate: _insurance_rate
              })
            })//!End fetch insurance rate

          //Pending loans
          /**if (_last && _loans.loan_status === 0 && _loans.loan_type_id_fk === 1) {
           this._pendingMsg = "" + _loans.loan_amount
         }*/

          //LOAN CONDITIONS BEGIN
          //if loan id is 1 or Normal loan
          /**if (_loans.loan_type_id_fk === 1) {
            this.loanService.getLoanConditions()
              .subscribe(data => {
                this.conditions = data;
                console.log("Loan conditions", data);
                //console.log("This group is", this._group_id)
                for (let _conditions of this.conditions) {
                  //Get group maturity date
                  this.groupService.getGroupById(this._group_id)
                    .subscribe(data => {
                      //console.log("this group", data)
                      this.group = data;
                      this._group_reg_date = this.group.map(a => { return a["group_reg_date"] })
                      console.log("reg date", this._group_reg_date)
                      var _reg_date = new Date(this._group_reg_date);
                      var _todayDate = new Date();
                      var _dateDiff_in_days = +_todayDate.getTime() - +_reg_date.getTime();
                      var _dateDiff = Math.ceil((_dateDiff_in_days / (1000 * 3600 * 24)) / 30)

                      console.log("Date difference", _dateDiff)

                      console.log("Conditions months", _conditions.group_months)
                      if (_dateDiff < _conditions.group_months) {
                        this.conditionsFeedback = "Loan eligibility condition not met: Group should be active for " + _conditions.group_months + " months";
                      } else {
                        //Get group total membership
                        this.memberService.getMemberByGId(this._group_id)
                          .subscribe(data => {
                            this.members = data;
                            if (this.members.length < _conditions.group_membership) {
                              this.conditionsFeedback = "Loan eligibility condition not met: Group membership is less than" + _conditions.group_membership;
                            } else {
                              this.savingsService.getSavingsById(this._member_id)
                                .subscribe(data => {
                                  console.log("Data savings", data)
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
                                  console.log("Total savings", this._total_savings)

                                  if (this._total_savings < _conditions.minimum_savings) {
                                    this.conditionsFeedback = "Loan eligibility condition not met: Member's savings are less than " + _conditions.minimum_savings;
                                  }
                                })
                            }
                          })
                      }
                    })
                }
              })
            //LOAN CONDITIONS END 

          }*/


          //!Begin Loan fetch  
          this.loanService.getloanById(id)
            .subscribe(data => {
              this.loans = data
              this._loan_bf = 0
              this.adv_bf = 0
              //get last loan
              let _last = this.loans[this.loans.length - 1]
              //TODO Check if member's ID exists in the loans table
              let _memberExist = this.loans.some(loan => {
                return loan.member_id_fk = id
              })//End check member id

              if (!_memberExist) {
                console.log("Member does not exist in loans table")
                this._loan_bf = 0
                this.adv_bf = 0
                this.loanappForm.patchValue({
                  loans_bf: this._loan_bf,
                  adv_bf: this.adv_bf
                });
              } else {
                console.log("Member Exists in loans table")
                //Evaluation
                for (let _loan of this.loans) {
                  if (_last && _loan.loan_status === 1 && _loan.loan_type_id_fk === 1) {
                    console.log("Loan id for normal loan", _loan.loan_id)
                    this.loanappForm.patchValue({
                      loan_id_fk: _loan.loan_id
                    });

                    //TODO:: Check if loan id exists in repayment table
                    this.loanService.getRepaymentsID(_loan.loan_id)
                      .subscribe(data => {
                        this.loanrepays = data;
                        console.log("Loan repays", this.loanrepays)
                        let _repays = this.loanrepays.some(repay => {
                          return repay.loan_id_fk = _loan.loan_id
                        })

                        //get count of loan id appearances
                        var _id_count = +this.loanrepays.length
                        console.log("count", _id_count)
                        //! 1. if loan id is not found in repayment table
                        if (!_repays) {
                          console.log("Normal loan no repayment exists")
                          this.new_active = true
                          this._default = false
                          this._loan_bf = _loan.loan_amount;
                          this.loanService.getRates()
                            .subscribe(data => {
                              this.lrates = data;
                              //console.log("this rates", this.lrates)
                              for (let _lrates of this.lrates) {
                                this._loan_interest = Math.round(((_lrates.normal_rate * this._loan_bf) / 100) / 5) * 5
                                //console.log("loan interest", this._loan_interest)

                                this.loanappForm.patchValue({
                                  loan_interest: this._loan_interest,
                                  loans_bf: this._loan_bf,
                                });
                              }
                            })
                          //! End 1. if loan id is not found in repayment table 

                          //if loan id is present in the repayment table
                        } else {
                          //get total loan repay amount
                          this._total_repay = +this.loanrepays.reduce((result, a) => {
                            let _principal_amount = a.principal_amount;
                            return result + _principal_amount;
                          }, 0);
                          //console.log("Total loan repayed", this._total_repay)
                          //get count of repay
                          console.log("Repay with this id appears ", _id_count, " times")
                          if (_id_count == 1) {
                            console.log("Repay appears only  once")
                            //get value of the last default value
                            let _total_payment = +this.loanrepays[this.loanrepays.length - 1].total_payments

                            if (_total_payment === 0) {
                              console.log("Total payment is 0")
                              //if date is beyond default else not yet default
                              //! Move this from here to to repayed section
                              //TODO:: check if loan is defaulted
                              var _temp = new Date(_loan.start_date)
                              var _new_date = new Date(_temp);
                              new Date((_new_date.setMonth(_new_date.getMonth() + 1)) + (_new_date.setDate(_new_date.getDate() + 14)));
                              //console.log("Todays date", this._date)
                              //console.log("Loan start date", _new_date)
                              //TODO get date difference in days
                              if (this._date > _new_date) {
                                console.log("Loan is in default because of date")
                                this._default = true
                                this._loan_bf = _loan.loan_amount - this._total_repay
                                //get default rate
                                this.loanService.getRates()
                                  .subscribe(data => {
                                    //console.log("loan rates", data)
                                    let _default_rate = +data.map(a => a.default_rate)
                                    this._default_amount = this._loan_bf * _default_rate / 100
                                    //console.log("Default amount", this._default_amount)
                                    //Patch values to form
                                    this.loanappForm.patchValue({
                                      loan_interest: 0,
                                      loans_bf: this._loan_bf
                                    })
                                  })
                              } else {
                                console.log("Loan is not in default because date is good")
                                this._default = false
                                this._loan_bf = _loan.loan_amount - this._total_repay;
                                this.loanService.getRates()
                                  .subscribe(data => {
                                    this.lrates = data;
                                    //console.log("this rates", this.lrates)
                                    for (let _lrates of this.lrates) {
                                      this._loan_interest = Math.round(((_lrates.normal_rate * this._loan_bf) / 100) / 5) * 5
                                      //console.log("loan interest", this._loan_interest)

                                      this.loanappForm.patchValue({
                                        loan_interest: this._loan_interest,
                                        loans_bf: this._loan_bf,
                                      });
                                    }
                                  })
                              }
                              //! Move this from here to repayed section

                            } else if (_total_payment > 0) {
                              console.log("Last Total payment is greater than 0")
                              //check default column
                              let _default_amount = +this.loanrepays[this.loanrepays.length - 1].default_amount
                              //console.log("Default amount is", _default_amount)
                              if (_default_amount > 0) {
                                console.log("Default amount is greater than 0")
                                this._default = true
                                this._default_amount = _default_amount
                                this._loan_bf = _loan.loan_amount
                                console.log("Loan bf = loan - repayments ")
                                this.loanappForm.patchValue({
                                  loan_interest: 0,
                                  loans_bf: this._loan_bf,
                                });
                              } else {
                                console.log("Last Total payment is equal 0")
                                this._default = false
                                this._loan_bf = _loan.loan_amount - this._total_repay
                                this.loanService.getRates()
                                  .subscribe(data => {
                                    this.lrates = data;
                                    //console.log("this rates", this.lrates)
                                    for (let _lrates of this.lrates) {
                                      this._loan_interest = Math.round(((_lrates.normal_rate * this._loan_bf) / 100) / 5) * 5
                                      //console.log("loan interest", this._loan_interest)

                                      this.loanappForm.patchValue({
                                        loan_interest: this._loan_interest,
                                        loans_bf: this._loan_bf,
                                      });
                                    }
                                  })
                              }

                            }
                          } else if (_id_count > 1) {//Evaluates when repay appears more than once
                            //TODO get for 20%
                            //TODO get for normal with interest
                            console.log("Count appears more than once")
                            //get value of the last default value
                            this._total_payment = +this.loanrepays[this.loanrepays.length - 1].total_payments
                            this._total_payment_2 = +this.loanrepays[this.loanrepays.length - 2].total_payments
                            let _last_default = +this.loanrepays[this.loanrepays.length - 1].default_amount
                            let _last_default_2 = +this.loanrepays[this.loanrepays.length - 2].default_amount
                            //console.log("last total amount", this._total_payment)
                            //console.log("second last total amount", this._total_payment_2)
                            //console.log("last default amount", _last_default)
                            //console.log("second last total amount", _last_default_2)


                            //get date of the last repay entry
                            let _last_date = new Date(this.loanrepays[this.loanrepays.length - 1].date_of_payment)
                            new Date((_last_date.setMonth(_last_date.getMonth() + 1) + _last_date.setDate(_last_date.getDate() + 14)))
                            console.log("Date of payment", _last_date)
                            //TODO Step 1: if last default_amount == 0
                            if (_last_default === 0) {
                              console.log("I am equal")
                              if (this._total_payment === 0) {//check if total pay is greater than 0
                                //check date
                                if (this._date > _last_date) {
                                  //loan in default
                                  console.log("I have defaulted")
                                  this._default = true
                                  this._loan_bf = _loan.loan_amount - this._total_repay
                                  this.loanService.getRates()
                                    .subscribe(data => {
                                      this.lrates = data;
                                      console.log("this rates", this.lrates)
                                      for (let _lrates of this.lrates) {

                                        this._default_amount = Math.round(((_lrates.default_rate * this._loan_bf) / 100) / 5) * 5
                                        this.loanappForm.patchValue({
                                          loan_interest: 0,
                                          loans_bf: this._loan_bf,
                                        });

                                      }
                                    })

                                } else {
                                  console.log("I have not defaulted")
                                  // get loan bf and interest
                                  this._default = false
                                  this._loan_bf = _loan.loan_amount - this._total_repay
                                  this.loanService.getRates()
                                    .subscribe(data => {
                                      this.lrates = data;
                                      //console.log("this rates", this.lrates)
                                      for (let _lrates of this.lrates) {

                                        this._loan_interest = Math.round(((_lrates.normal_rate * this._loan_bf) / 100) / 5) * 5
                                        this.loanappForm.patchValue({
                                          loan_interest: this._loan_interest,
                                          loans_bf: this._loan_bf,
                                        });
                                      }
                                    })
                                }//end check date
                              } else {//Payment total is greater than 0
                                console.log("No default")
                                this._default = false
                                this._loan_bf = _loan.loan_amount - this._total_repay
                                this.loanService.getRates()
                                  .subscribe(data => {
                                    this.lrates = data;
                                    //console.log("this rates", this.lrates)
                                    for (let _lrates of this.lrates) {

                                      this._loan_interest = Math.round(((_lrates.normal_rate * this._loan_bf) / 100) / 5) * 5
                                      this.loanappForm.patchValue({
                                        loan_interest: this._loan_interest,
                                        loans_bf: this._loan_bf,
                                      });
                                    }
                                  })

                              }

                            } else if (_last_default > 0) {
                              //?How do i check if default is default 20% and 40%
                              console.log("I am greater")
                              this._default = true;
                              this._default_amount = _last_default
                              this._loan_bf = _loan.loan_amount - this._total_repay
                              this.loanappForm.patchValue({
                                loan_interest: this._loan_interest,
                                loans_bf: this._loan_bf,
                              });
                            }


                          }
                        }
                      })
                    //End normal loan
                    //TODO Evaluate Advance loan
                  } else if (_last && _loan.loan_status === 1 && _loan.loan_type_id_fk === 2) {
                    this._new_loan = false
                    console.log("Loan id for advance loan", _loan.loan_id)
                    this.loanappForm.patchValue({
                      adv_id_fk: _loan.loan_id
                    });

                    //get loan repayment by loan id
                    this.loanService.getRepaymentsID(_loan.loan_id)
                      .subscribe(data => {
                        this.loanrepays = data;
                        console.log("Advance loan repays", this.loanrepays)
                        let _repays = this.loanrepays.some(repay => {
                          return repay.loan_id_fk = _loan.loan_id
                        })

                        //get count of loan id appearances
                        var _id_count = +this.loanrepays.length
                        console.log("Advance count", _id_count)
                        //TODO Check if any repay has been made
                        if (!_repays) {
                          console.log("No advance repays")
                          this.new_active_adv = true
                          let _adv_bf = _loan.loan_amount;
                          this._adv_default_amount = 0
                          this.adv_default = false

                          console.log("Advance loan amount", _adv_bf)
                          this.loanService.getRates()
                            .subscribe(data => {
                              this.lrates = data;
                              //console.log("this rates", this.lrates)
                              for (let _lrates of this.lrates) {
                                this._adv_loan_interest = Math.round(((_lrates.advance_rate * _adv_bf) / 100) / 10) * 10
                                this.adv_bf = _adv_bf + this._adv_loan_interest
                                console.log("loan interest", this._adv_loan_interest)
                                this.loanappForm.patchValue({
                                  adv_loan_interest: this._adv_loan_interest,
                                  adv_bf: this.adv_bf,
                                });

                                console.log("Advance loan amount", this.adv_bf)
                              }
                            })
                          //! End 1. if loan id is not found in repayment table 

                        } else {//Repay is present
                          console.log("Advance repays present")
                          let _last_adv = +this.loanrepays[this.loanrepays.length - 1].total_payments
                          let _last_adv_date = new Date(this.loanrepays[this.loanrepays.length - 1].date_of_payment)
                          //Evaluate count
                          //get total loan repay amount
                          this._total_repay = +this.loanrepays.reduce((result, a) => {
                            let _principal_amount = a.principal_amount;
                            return result + _principal_amount;
                          }, 0);
                          console.log("Total loan repayed", this._total_repay)
                          //get count of repay
                          console.log("Repay with this id appears ", _id_count, " times")
                          if (_id_count == 1) {
                            //id only appears once in the repay table
                            let _adv_bf = _loan.loan_amount
                            //console.log("Repayment made once")
                            //console.log("advance Loan amount", _adv_bf)
                            //Evaluate total payment

                            new Date((_last_adv_date.setMonth(_last_adv_date.getMonth() + 1) + _last_adv_date.setDate(_last_adv_date.getDate() + 14)))
                            //console.log("Total payment amount", _last_adv)
                            //console.log("Total payment date", _last_adv_date)
                            //console.log("Todays date", this._date)
                            if (_last_adv === 0) {
                              // Evaluate date
                              if (this._date > _last_adv_date) {
                                console.log("Advance in default coz date is greate")
                                this.adv_default = true
                                this._adv_loan_interest = 0
                                this.loanService.getRates()
                                  .subscribe(data => {
                                    this.lrates = data
                                    for (let _lrates of this.lrates) {
                                      //console.log("Advance rate", _lrates.advance_rate)
                                      let temp_loan_amount = _loan.loan_amount - this._total_repay
                                      //console.log("temp loan", temp_loan_amount)
                                      this._adv_loan_interest = Math.round(((_lrates.advance_rate * _loan.loan_amount) / 100) / 10) * 10
                                      //console.log("advance Interest", this._adv_loan_interest)
                                      let temp_adv_bf = temp_loan_amount + this._adv_loan_interest
                                      //console.log("Loan with interest", temp_adv_bf)
                                      this._adv_default_amount = Math.round(temp_adv_bf * _lrates.default_rate) / 100
                                      //console.log("Default amount", this._adv_default_amount)

                                      this.adv_bf = temp_adv_bf + this._adv_default_amount
                                      this.loanappForm.patchValue({
                                        adv_loan_interest: this._adv_loan_interest,
                                        adv_bf: this.adv_bf,
                                      });
                                    }
                                  })
                              } else {
                                this.adv_default = false
                                this._adv_default_amount = 0
                                console.log("Advance not in default repay count is 1 and date is less")
                                this.loanService.getRates()
                                  .subscribe(data => {
                                    this.lrates = data
                                    //console.log("Rates no default", this.lrates)
                                    for (let _lrates of this.lrates) {
                                      //console.log("Advance rate", _lrates.advance_rate)
                                      let temp_adv_bf = _loan.loan_amount - this._total_repay
                                      this._adv_loan_interest = Math.round(((temp_adv_bf * _lrates.advance_rate) / 100) / 10) * 10
                                      //console.log("Temp adv bf",this._adv_bf)
                                      //console.log("Adv interest",this._adv_loan_interest)
                                      this.adv_bf = temp_adv_bf + this._adv_loan_interest

                                      this.loanappForm.patchValue({
                                        adv_loan_interest: this._adv_loan_interest,
                                        adv_bf: this.adv_bf,
                                      });
                                    }

                                  })
                              }

                            } else if (_last_adv > 0) {
                              console.log("Not in default repay is greater than 0")
                              this.adv_default = false
                              this._adv_default_amount = 0
                              //console.log("Advance not in default")
                              this.loanService.getRates()
                                .subscribe(data => {
                                  this.lrates = data
                                  // console.log("Rates no default", this.lrates)
                                  for (let _lrates of this.lrates) {
                                    // console.log("Advance rate", _lrates.advance_rate)
                                    let temp_adv_bf = _loan.loan_amount - this._total_repay
                                    this._adv_loan_interest = Math.round(((temp_adv_bf * _lrates.advance_rate) / 100) / 10) * 10
                                    // console.log("Temp adv bf",temp_adv_bf)
                                    // console.log("Adv interest",this._adv_loan_interest)
                                    this.adv_bf = temp_adv_bf + this._adv_loan_interest

                                    this.loanappForm.patchValue({
                                      adv_loan_interest: this._adv_loan_interest,
                                      adv_bf: this.adv_bf,
                                    });
                                  }

                                })
                            }
                          } else if (_id_count > 1) {
                            //repay made more than once
                            console.log("Repayment made more than once")
                            //TODO Step check for preexisting default
                            //console.log("Last payment", _last_adv)
                            //console.log("Last payment", _last_adv_date)
                            let _last_default = +this.loanrepays[this.loanrepays.length - 1].default_amount
                            let _last_adv = +this.loanrepays[this.loanrepays.length - 1].total_payments
                            let _last_adv2 = +this.loanrepays[this.loanrepays.length - 2].total_payments
                            let _last_date = this.loanrepays[this.loanrepays.length - 1].date_of_payment
                            console.log("Last total payment", _last_adv2)
                            console.log("Last date of payment", _last_date)

                            //Test the value of last default amount
                            if (_last_default > 0 && _last_adv2 === 0) {
                              console.log("40% fine")
                              let temp_default_amount = _last_default
                              console.log("temporary default", temp_default_amount)
                              let temp_adv_bf = _loan.loan_amount - this._total_repay
                              console.log("temporary adv bf", temp_adv_bf)

                              let _last_date2 = new Date(_last_date)
                              console.log("2nd last date of payment", _last_date2)
                              new Date((_last_date2.setMonth(_last_date2.getMonth() + 1) + _last_date2.setDate(_last_date2.getDate() + 14)))
                              console.log("new second date", _last_date2)

                              //!This might need corrections later
                              this.loanService.getRates()
                                .subscribe(data => {
                                  //test dates
                                  if (this._date > _last_date2) {
                                    this.adv_default = true
                                    console.log("40% Default")
                                    for (let _lrates of data) {
                                      this._adv_loan_interest = Math.round(((temp_adv_bf * _lrates.advance_rate) / 100) / 10) * 10
                                      console.log("Interest", this._adv_loan_interest)
                                      //add interest to temp_adv_bf
                                      let temp_adv_bf2 = temp_adv_bf + this._adv_loan_interest + temp_default_amount
                                      console.log("temporary adv bf 2", temp_adv_bf2)
                                      this._adv_default_amount = Math.round((temp_adv_bf2 * _lrates.default_rate) / 100)
                                      console.log("default_amount", this._adv_default_amount)
                                      this.adv_bf = temp_adv_bf2 + this._adv_default_amount
                                      //patch values to form
                                      this.loanappForm.patchValue({
                                        adv_loan_interest: 0,
                                        adv_bf: this.adv_bf,
                                      });
                                    }
                                  } else {
                                    console.log("No 40% default")
                                    this.adv_default = false
                                    for (let _lrates of data) {
                                      this._adv_loan_interest = Math.round(((temp_adv_bf * _lrates.advance_rate) / 100) / 10) * 10
                                      console.log("Interest", this._adv_loan_interest)
                                      this.adv_bf = temp_adv_bf + this._adv_loan_interest + temp_default_amount
                                      console.log("Total adv bf", this.adv_bf)
                                      this.loanappForm.patchValue({
                                        adv_loan_interest: 0,
                                        adv_bf: this.adv_bf,
                                      });
                                    }
                                  }


                                })
                            } else if (_last_default === 0) {
                              console.log("No default yet requires further test")
                              //check if loan had any previous default
                              let _default_filter = this.loanrepays.filter(x => { return x.default_amount > 0 })
                              //_default_filter[_default_filter.length - 1].default_amount
                              console.log("Filtered", _default_filter)
                              //check if Previous default exist
                              let _DefaultExist = this.loanrepays.some(loan => {
                                return loan.default_amount > 0
                              })
                              if (_DefaultExist) {
                                console.log("Cleared Default exists before");
                                //get value of the last filtered default
                                let _exist_default = +_default_filter[_default_filter.length - 1].default_amount
                                console.log("last default value", _last_default)
                                console.log("last existing default value", _exist_default)
                                console.log("Last payment", _last_adv)

                                //!carry out checks ensure you check when loan + default is 0 
                                if (_last_adv > 0) {
                                  console.log("No further defaults")
                                  console.log("Loan amount", _loan.loan_amount)
                                  console.log("Repay amount", this._total_repay)
                                  let temp_adv_bf = _loan.loan_amount - this._total_repay

                                } else { //if _last_adv = 0 && 
                                  console.log("Test for 20% penalty")
                                }
                                //!end relook


                              } else {
                                console.log("No default exists before")
                                //TODO Check 
                                //let _adv_bf = _loan.loan_amount
                                let _last_adv = +this.loanrepays[this.loanrepays.length - 1].total_payments
                                let _last_adv2 = +this.loanrepays[this.loanrepays.length - 2].total_payments
                                let _last_default = +this.loanrepays[this.loanrepays.length - 1].default_amount
                                let _last_default2 = +this.loanrepays[this.loanrepays.length - 2].default_amount
                                let _last_adv_date = new Date(this.loanrepays[this.loanrepays.length - 1].date_of_payment)
                                new Date((_last_adv_date.setMonth(_last_adv_date.getMonth() + 1) + _last_adv_date.setDate(_last_adv_date.getDate() + 14)))
                                //console.log("Advance bf", _loan.loan_amount)
                                //console.log("Last Advance total", _last_adv)
                                //console.log("2 last advance total", _last_adv2)
                                //console.log("Last default", _last_default)
                                //console.log("2 Last default", _last_default2)
                                console.log("Last adv date", _last_adv_date)
                                //check last total pay
                                if (_last_adv === 0) {//evaluate for 20% fine
                                  console.log("Possible default 20%")
                                  if (this._date > _last_adv_date) {
                                    console.log("Defaulted")
                                    this.adv_default = true
                                    let _adv_bf = _loan.loan_amount - this._total_repay
                                    this.loanService.getRates()
                                      .subscribe(data => {
                                        for (let _lrate of data) {
                                          console.log("Loan rates", _lrate)
                                          this._adv_loan_interest = Math.round(((_adv_bf * _lrate.advance_rate) / 100) / 10) * 10
                                          let temp_adv_bf = _adv_bf + this._adv_loan_interest
                                          this._adv_default_amount = Math.round(temp_adv_bf * _lrate.default_rate) / 100
                                          this.adv_bf = temp_adv_bf + this._adv_default_amount
                                          //TODO Patch values
                                          this.loanappForm.patchValue(
                                            {
                                              adv_loan_interest: 0,
                                              adv_bf: this.adv_bf,
                                            }
                                          )
                                        }
                                      })

                                  } else {//calculate with interest
                                    console.log("Not defaulted")
                                    this.adv_default = false
                                    let _adv_bf = _loan.loan_amount - this._total_repay
                                    this.loanService.getRates()
                                      .subscribe(data => {
                                        for (let _lrate of data) {
                                          this._adv_loan_interest = Math.round(((_lrate.advance_rate * _adv_bf) / 100) / 10) * 10
                                          this.adv_bf = _adv_bf + this._adv_loan_interest
                                          //TODO Patch values
                                          this.loanappForm.patchValue(
                                            {
                                              adv_loan_interest: this._adv_loan_interest,
                                              adv_bf: this.adv_bf,
                                            }
                                          )
                                        }
                                      })
                                  }

                                } else {
                                  console.log("No default")
                                  this.adv_default = false
                                  let _adv_bf = _loan.loan_amount - this._total_repay
                                  this.loanService.getRates()
                                    .subscribe(data => {
                                      for (let _lrate of data) {
                                        this._adv_loan_interest = Math.round(((_lrate.advance_rate * _adv_bf) / 100) / 10) * 10
                                        this.adv_bf = _adv_bf + this._adv_loan_interest
                                        //TODO Patch values
                                        this.loanappForm.patchValue(
                                          {
                                            adv_loan_interest: this._adv_loan_interest,
                                            adv_bf: this.adv_bf,
                                          }
                                        )
                                      }
                                    })
                                }

                              }
                            }
                          }
                        }
                      })

                  } else if (_last && _loan.loan_status === 0 && _loan.loan_type_id_fk === 1) {
                    this._new_loan = true
                    this._loan_bf = _loan.loan_amount;
                    console.log("Evaluates as True")
                    this.loanappForm.patchValue({
                      loan_interest: 0,
                      loans_bf: this._loan_bf,
                      
                    });
                  }
                }
              }
            })//!End loan fetch 
          this.spinner.hide()

          this.loanappForm.patchValue({
            group_id: this._group_id,
            group_name: this._group_name,
            group_code: this._group_code,
            group_officer: this._group_officer,
            member_name: this._member_name,
            membership_no: this._membership_no,
            member_id_no: this._member_id_no,
          });

        }); //!End Member Service
    });

  }






  //End Long Term



  /* if (this._pendingMsg) {
     this._pendingLoansMsg = "Application denied: You already have pending loan applications!"
   }**/

  /**if ((this._pendingMsg && this.loanappForm.value.loans_bf > 0) && (this.loanappForm.value.adv_bf > 0)) {
    this._pendingLoansMsg = "Application denied: You have a pre-existing loan and a pending loan application"
    this.loanappForm.disable()
  }
  
  if (this.loanappForm.value.loans_bf > 0 && this.loanappForm.value.adv_bf > 0) {
    this.errorMsg = "Application denied: You already have pre-existing loans"
    this.loanappForm.disable()
  }*/
  //End advance


  //close spinner



  //END LOAN FETCH   




  //purpose scrolldown



  //Loan type select
  onChangeLoanType(loan_type_id) {
    console.log("some thing")
    this.negError = ""
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.loanService.getloanById(id)
        .subscribe(data => {
          this.loans = data;
          var _last = this.loans[this.loans.length - 1]

          //check if member exist
          let _memberExist = this.loans.some(loan => {
            return loan.member_id_fk = id
          })
          if (!_memberExist) {
            this.formEnable()

            this.savingsService.getSavingsById(id)
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
                //Get total savings bf
                this._total_savings = this._savings_total + this._savings_bf
                //begin loan type test
                this.loanService.getRates()
                  .subscribe(data => {
                    this.rates = data;
                    //begin for
                    for (let lrate of this.rates) {
                      if (+this.loanappForm.value.loan_type_id == 1) {
                        console.log("This is long loan")
                        var limit = (this._total_savings * lrate.long_term);

                        //disable form elements
                        this.loanappForm.get('guarantorsName').disable();
                        this.loan_amountRef.nativeElement.focus();
                      }
                      else {
                        console.log("This is Advance loan")
                        var limit = (this._total_savings * lrate.adv_term);
                        this.formEnable()
                        this.loan_amountRef.nativeElement.focus();

                      }
                      if ((+this.loanappForm.value.loan_type_id == 1) && (+this.loanappForm.value.loans_bf == 0)) {
                        this.loan_t = "Long term";
                        this.amount = this.loanappForm.value.loan_bf;
                        this.feedback = "You have a " + this.loan_t + " loan limit of: KShs." + limit;
                        this.negFeedback = "";
                        this.loanappForm.patchValue({
                          loan_status: 0
                        })
                        //enable form elements
                        this.formEnable()
                        this.loan_amountRef.nativeElement.focus();
                        this.loanappForm.get('guarantorsName').disable();
                      }
                      else if ((+this.loanappForm.value.loan_type_id == 2) && (+this.loanappForm.value.adv_bf == 0)) {
                        this.loan_t = "Advance";
                        this.amount = this.loanappForm.value.adv_bf;
                        this.feedback = "You have an " + this.loan_t + " loan limit of: KShs." + limit;
                        this.negFeedback = "";
                        this.loanappForm.patchValue({
                          loan_status: 1
                        })
                        //enable form elements
                        this.formEnable()
                        this.loan_amountRef.nativeElement.focus();
                      }
                      //patch values
                      this.loanappForm.patchValue({
                        loan_limit: limit
                      }); //end patch              
                    } //end for            
                  });
              }); //end savings service     

          } else {
            for (let _loans of this.loans) {
              this.savingsService.getSavingsById(id)
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
                  //Get total savings bf
                  this._total_savings = this._savings_total + this._savings_bf
                  //begin loan type test
                  this.loanService.getRates()
                    .subscribe(data => {
                      this.rates = data;
                      //begin for
                      for (let lrate of this.rates) {
                        if (this.loanappForm.value.loan_type_id == 1) {
                          console.log("This is long loan")
                          var limit = (this._total_savings * lrate.long_term);

                          //Enable form elements
                          this.formEnable()
                          this.loan_amountRef.nativeElement.focus();
                          this.loanappForm.get('guarantorsName').disable();
                        }
                        else {
                          console.log("This is Advance loan")
                          var limit = (this._total_savings * lrate.adv_term);
                          this.formEnable()
                          this.loan_amountRef.nativeElement.focus();

                        }
                        if ((this.loanappForm.value.loan_type_id == 1) && (this.loanappForm.value.loans_bf == 0)) {
                          this.loan_t = "Long term";
                          this.amount = this.loanappForm.value.loan_bf;
                          this.feedback = "You have a " + this.loan_t + " loan limit of: KShs." + limit;
                          this.negFeedback = "";
                          this.loanappForm.patchValue({
                            loan_status: 0
                          })
                          //enable form elements
                          this.formEnable()
                          this.loan_amountRef.nativeElement.focus();
                          this.loanappForm.get('guarantorsName').disable();
                        }
                        else if ((this.loanappForm.value.loan_type_id == 2) && (this.loanappForm.value.adv_bf == 0)) {
                          this.loan_t = "Advance";
                          this.amount = this.loanappForm.value.adv_bf;
                          this.feedback = "You have an " + this.loan_t + " loan limit of: KShs." + limit;
                          this.negFeedback = "";
                          this.loanappForm.patchValue({
                            loan_status: 1
                          })
                          //enable form elements
                          this.formEnable()
                          this.loan_amountRef.nativeElement.focus();
                        }/**
                        else if ((this.loanappForm.value.loans_bf > 0) && (this.loanappForm.value.adv_bf > 0)) {
                          this.negFeedback = "You do not qualify any loan at the moment: Kindly clear your loans before new application";
                          this.feedback = "";
                          this.loanappForm.patchValue({
                            loan_status: 0
                          })
                          //enable form elements
                          this.formDisable()
                        } else if (_last && _loans.loan_status === 0 && _loans.loan_type_id_fk === 1) {
                          this._pendingLoansMsg = "You already have pending loan applications!"
                          this.feedback = "";
                          this.loanappForm.patchValue({
                            loan_status: 0
                          })
                          //enable form elements
                          this.formDisable()

                        } else {
                          this.negFeedback = "You have an outstanding loan of the selected type";
                          this.feedback = "";
                          this.loanappForm.patchValue({
                            loan_status: 0
                          })
                          //enable form elements
                          this.formDisable()
                        }*/
                        //patch values
                        this.loanappForm.patchValue({
                          loan_limit: limit
                        }); //end patch              
                      } //end for            
                    });
                }); //end savings service     
            }
          }
        })
    }); //end of paramMap
  }; //End loan limit function


  onFocusDate1(start_date) {
    if (this.loanappForm.value.loan_amount == null) {
      this.negError = "Enter loan amount before selecting date"
      this.loan_amountRef.nativeElement.focus()
    } else {
      this.negError = ""
    }
  }

  onFocusDate2(end_date) {
    if (this.loanappForm.value.start_date == null) {
      this.negDateErr = "Select the start date"
      this.start_dateRef.nativeElement.focus()
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


  onAmountChange() {
    if (this.loanappForm.value.loan_amount > this.loanappForm.value.loan_limit) {
      this.negError = "Amount entered surpasses the loan limit";
      this.loan_amountRef.nativeElement.focus();
    }
    else {
      this.negError = ""
    }

    //change loan rate
    if (this.loanappForm.value.loan_type_id == 1) {
      let _loan_insurance_rate = Math.round((this.loanappForm.value.loan_amount * this.loanappForm.value._insurance_rate / 100) / 5) * 5
      console.log("I am here today", _loan_insurance_rate)
      this.loanappForm.patchValue({
        loan_insurance_rate: _loan_insurance_rate
      })

    } else {
      this.loanappForm.patchValue({
        loan_insurance_rate: 0
      })
    }


  }


  formDisable() {
    // this.loanappForm.get('loan_type_id').disable();
    this.loanappForm.get('loan_amount').disable();
    this.loanappForm.get('start_date').disable();
    this.loanappForm.get('end_date').disable();
    this.loanappForm.get('guarantorsName').disable();
    this.loanappForm.get('loan_purpose').disable();
    this.loanappForm.get('loan_fee').disable();
  };

  formEnable() {
    //this.loanappForm.get('loan_type_id').enable();
    this.loanappForm.get('loan_amount').enable();
    this.loanappForm.get('start_date').enable();
    this.loanappForm.get('end_date').enable();
    this.loanappForm.get('guarantorsName').enable();
    this.loanappForm.get('loan_purpose').enable();
    this.loanappForm.get('loan_fee').enable();
  };

  formReset() {
    this.loanappForm.get('loan_type_id').reset();
    this.loanappForm.get('loan_amount').reset();
    this.loanappForm.get('start_date').reset();
    this.loanappForm.get('end_date').reset();
    this.loanappForm.get('guarantorsName').reset();
    this.loanappForm.get('loan_purpose').reset();
    this.loanappForm.get('loan_fee').reset();
  }

  save() {
    this.spinner.show()
    var _member_id = this.loanappForm.value.member_id_fk
    var _loan_type = this.loanappForm.value.loan_type_id
    var _loan_amount = this.loanappForm.value.loan_amount
    var _adv_status = 1

    if (this.loanappForm.value.loan_type_id == 1) {
      console.log("This form", this.loanappForm.value)

      var newLoan = {
        member_id_fk: _member_id,
        loan_type_id_fk: _loan_type,
        loan_amount: _loan_amount,
        loan_fee: this.loanappForm.value.loan_fee,
        start_date: this.loanappForm.value.start_date,
        guarantorsName: "All Members",
        loan_purpose: this.loanappForm.value.loan_purpose.join(','),
        end_date: this.loanappForm.value.end_date,
        loan_status: this.loanappForm.value.loan_status,
        overide_status: this.loanappForm.value.overide_status,
        repayment_status: this.loanappForm.value.repayment_status,
        overide_comments: this.loanappForm.value.overide_comments,
      };
      this.loanService.addLoan(newLoan)
        .subscribe(loan => {
          console.log(loan);
          this.loans.push(loan);
          this.successMsg = "Loan application successfully submitted";
          this.feedback = ""
          this.negFeedback = ""
          this.conditionsFeedback = ""
          this.spinner.hide()
          this.ngOnInit()
        },
          //display a failure error
          error => this.errorMsg = error);
    } else {
      console.log("This form", this.loanappForm.value)
      var newLoanAdv = {
        member_id_fk: this.loanappForm.value.member_id_fk,
        loan_type_id_fk: this.loanappForm.value.loan_type_id,
        loan_amount: this.loanappForm.value.loan_amount,
        loan_fee: this.loanappForm.value.loan_fee,
        start_date: this.loanappForm.value.start_date,
        guarantorsName: this.loanappForm.value.guarantorsName.join(','),
        loan_purpose: this.loanappForm.value.loan_purpose.join(','),
        end_date: this.loanappForm.value.end_date,
        loan_status: _adv_status,
        repayment_status: this.loanappForm.value.repayment_status,

      };
      this.loanService.addLoan(newLoanAdv)
        .subscribe(loan => {
          console.log(loan);
          this.loans.push(loan);
          this.successMsg = "Loan application successfully submitted";
          this.feedback = ""
          this.negFeedback = ""
          this.conditionsFeedback = ""
          this.spinner.hide()
          this.ngOnInit()
        },
          //display a failure error
          error => this.errorMsg = error);
    }

  };

  resetForm() {
    this.successMsg = "";
    this.feedback = "";
    this.negFeedback = "";
    this.loanappForm.patchValue({
      loan_type_id: "",
      loan_amount: "",
      start_date: "",
      end_date: "",
      loan_fee: "",
      guarantorsName: "",
      loan_purpose: "",
      overide_comments: ""
    });
  };

  golist() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.memberService.getMemberById(id)
        .subscribe(data => {
          this.members = data;
          for (let m of this.members) {
            console.log("this group id is", m.group_id_fk);
            this.router.navigate(['/group/llist', m.group_id_fk]);
          }
        });
    });
  }; //end golist

  goDets() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.router.navigate(['../../../member', id], { relativeTo: this.route });
    });
  };

  //go to savings
  goSavings() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.router.navigate(['../../../savings/create', id], { relativeTo: this.route });
    });
  };

  //go to savings
  goDividend() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.router.navigate(['../../../dividend/create', id], { relativeTo: this.route });
    });
  };


  //records bf
  recordsBF() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));

      this.router.navigate(['../../../records/create/', id], { relativeTo: this.route })
    })
  }

  //referesh list
  refresh() {
    this.ngOnInit();
  }







}
