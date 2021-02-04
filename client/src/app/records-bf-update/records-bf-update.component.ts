import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MemberService } from '../_services/member.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Title } from '@angular/platform-browser';
import { Member } from '../_models/member';
import { SavingsService } from '../_services/savings.service';
import { LoanService } from '../_services/loan.service';

@Component({
  selector: 'app-records-bf-update',
  templateUrl: './records-bf-update.component.html',
  styleUrls: ['./records-bf-update.component.css']
})
export class RecordsBfUpdateComponent implements OnInit {
  pageTitle = "CAPEP KENYA : Update Savings brought forward"
  recBFUpdateForm: FormGroup;
  member: Member;
  members: any;
  _group_id: number;
  _group_name: string;
  _group_code: string;
  _member_id: string;
  _member_name: string;
  _membership_no: number;
  _member_id_no: string;
  savings: any;
  _savings_total: number;
  _savings_bf: number;
  _total_savings: number;
  _mid: any;
  _savings_brought: any;
  _savings_id: any;
  _savings_date: any;
  _dates: string;

  todays_day: Date = new Date()
  successMsg: string;
  errorMsg: any;
  loans: any;
  _loan_bf: number;
  adv_bf: number;
  loanrepays: any;
  new_active: boolean = false;
  _default: boolean = false;
  lrates: any;
  _loan_interest: number;
  _total_repay: number;
  _date: Date = new Date();
  _default_amount: number;
  _total_payment: number;
  _total_payment_2: number;
  new_active_adv: boolean = false;
  _adv_default_amount: number;
  _adv_loan_interest: number;
  adv_default: boolean = false;
  _adv_bf: number;
  _new_loan: boolean = false;



  constructor(private spinner: NgxSpinnerService, private _location: Location, private formBuilder: FormBuilder, private title: Title, private route: ActivatedRoute, private router: Router, private memberService: MemberService,private loanService: LoanService , private savingsService: SavingsService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle)
    this.spinner.show()

    this.recBFUpdateForm = this.formBuilder.group({
      savings_bf: [0],
      savings_id: [0],
      member_id: [null],
      _date: [null]

    })


    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      //fetch savings by ID
      this.savingsService.getSavingsBySId(id)
        .subscribe(data => {
          this.savings = data
          this._mid = this.savings.map(a => a.member_id_fk)
          this._savings_id = this.savings.map(a => a._savings_id);
          this._savings_brought = this.savings.map(a => a.savings_bf)
          this._savings_date = this.savings.map(a => a.savings_date)
          this._dates = new Date(this._savings_date).toISOString().substring(0, 10)

          console.log("Savings total array date", this._dates)
          this.spinner.hide()
          //get member details
          this.memberService.getMemberById(this._mid)
            .subscribe(data => {
              this.member = data;
              this._group_id = +this.member.map(function (a) { return a['group_id']; });
              this._group_name = this.member.map(function (a) { return a['group_name']; });
              this._group_code = this.member.map(function (a) { return a['group_code']; });
              this._member_id = this.member.map(a => a.member_id);
              //this._group_officer = this.member.map(function (a) { return a['group_officer']; });
              this._member_name = this.member.map(function (a) { return a['member_name']; });
              this._membership_no = +this.member.map(function (a) { return a['membership_no']; });
              this._member_id_no = this.member.map(function (a) { return a['member_id_no']; });

              this.recBFUpdateForm.patchValue({
                member_id: this._member_id,
                savings_id: this._savings_id,
                savings_bf: this._savings_brought,
                _date: this._dates
              })
              console.log("this member id", this._mid)

              //!fetch member savings
              this.savingsService.getSavingsById(this._mid).subscribe(s => {
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

              //!Begin Loan fetch  
              this.loanService.getloanById(this._mid)
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
                      
                  } else {
                      console.log("Member Exists in loans table")
                      //Evaluation
                      for (let _loan of this.loans) {
                          if (_last && _loan.loan_status === 1 && _loan.loan_type_id_fk === 1) {
                              console.log("Loan id for normal loan", _loan.loan_id)
                              this._new_loan = false
                              console.log("Loan id for normal loan", _loan.loan_id)

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
                                             // let _savings_id = +this.loanrepays[this.loanrepays.length - 1].savings_id_fk
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

                                                                         }
                                                                  })
                                                              console.log("Loan bf = loan - repayments also get interest ")
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
                                                                  
                                                              }
                                                          })

                                                  }

                                              } else if (_last_default > 0) {
                                                  //?How do i check if default is default 20% and 40%
                                                  console.log("I am greater")
                                                  this._default = true;
                                                  this._default_amount = _last_default
                                                  this._loan_bf = _loan.loan_amount - this._total_repay
                                                 
                                              }


                                          }
                                      }
                                  })
                              //End normal loan
                              //TODO Evaluate Advance loan
                          } else if (_last && _loan.loan_status === 1 && _loan.loan_type_id_fk === 2) {
                            this._new_loan = false  
                            console.log("Loan id for advance loan", _loan.loan_id)
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
                                                      console.log("loan interest", this._adv_loan_interest)
                                                      this.adv_bf = _adv_bf + this._adv_loan_interest
                                                    //console.log("Advance loan amount", this.adv_bf)
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
                                                              console.log("Rates", this.lrates)
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
                                                                           
                                                                        }
                                                                    } else {
                                                                        console.log("No 40% default")
                                                                        this.adv_default = false
                                                                        for (let _lrates of data) {
                                                                            this._adv_loan_interest = Math.round(((temp_adv_bf * _lrates.advance_rate) / 100) / 10) * 10
                                                                            console.log("Interest", this._adv_loan_interest)
                                                                            this.adv_bf = temp_adv_bf + this._adv_loan_interest + temp_default_amount
                                                                            console.log("Total adv bf", this.adv_bf)
                                                                            
                                                                        }
                                                                    }


                                                                })
                                                        } else if (_last_default === 0) {
                                                  console.log("No default yet requires further test")
                                                  //check if loan had any previous default
                                                  let _default_filter = this.loanrepays.filter(x => { return x.default_amount > 0 })
                                                  //_default_filter[_default_filter.length - 1].default_amount
                                                  console.log("Filtered default values", _default_filter)
                                                  //check if Previous default exist
                                                  let _DefaultExist = this.loanrepays.some(loan => {
                                                      return loan.default_amount > 0
                                                  })
                                                 //!Relook at this bit 
                                                 if (_DefaultExist) {
                                                    console.log("Cleared Default exists before");
                                                    //get value of the last filtered default
                                                    let _exist_default =  +_default_filter[_default_filter.length - 1].default_amount
                                                    console.log("last default value",_last_default)
                                                    console.log("last existing default value",_exist_default)
                                                    console.log("Last payment", _last_adv)

                                                    //!carry out checks ensure you check when loan + default is 0 
                                                    if (_last_adv > 0){
                                                      console.log("No further defaults")
                                                      console.log("Loan amount",_loan.loan_amount)
                                                      console.log("Repay amount",this._total_repay)
                                                      let temp_adv_bf = _loan.loan_amount - this._total_repay

                                                    } else{ //if _last_adv = 0 && 
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
                                                        console.log("Check for Possible default 20%")
                                                        if (this._date > _last_adv_date) {
                                                            console.log("Defaulted 20%")
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
                              console.log("Pending normal loan")
                             
                          }
                      }
                  }
              })//!End loan fetch 


            });
        })


      //get group guarantors




    })
  }

  submit() {
    this.spinner.show()
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      var _member_id = this.recBFUpdateForm.value.member_id
      const updateBF = {
        total_payments: 0,
        savings_amount: 0,
        savings_bf: this.recBFUpdateForm.value.savings_bf,
        update_date: this.recBFUpdateForm.value._date
      }

      this.savingsService.updateSavings(id, updateBF)
        .subscribe(data => {
          this.successMsg = "Records updated successfully"
          this.ngOnInit()
          this.spinner.hide()
        },
          error => this.errorMsg = error)
    })
  }


  //refresh
  refresh() {
    this.ngOnInit();
  }

  back() {
    this._location.back();
  }


}
