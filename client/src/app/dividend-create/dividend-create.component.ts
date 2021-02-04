import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MemberService } from '../_services/member.service';
import { SavingsComponent } from '../savings/savings.component';
import { SavingsService } from '../_services/savings.service';
import { LoanService } from '../_services/loan.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Member } from '../_models/member';
import { Group } from '../_models/group';
import { Loan } from '../_models/loan';
import { Saving } from '../_models/saving';
import { DivPurpose } from '../_models/div-purpose';
import { DividendService } from '../_services/dividend.service';
import { Dividend } from '../_models/dividend';

@Component({
  selector: 'app-dividend-create',
  templateUrl: './dividend-create.component.html',
  styleUrls: ['./dividend-create.component.css']
})
export class DividendCreateComponent implements OnInit {
  @ViewChild('trf', { static: false }) trfRef: ElementRef;

  pageTitle = "CAPEP KENYA : Dividend Allocation"

  dividendForm: FormGroup

  member: Member;
  members: Member[]
  group: Group;
  groups: Group[];
  loan: Loan;
  loans: Loan[];
  saving: Saving;
  savings: Saving[]
  dividend: Dividend;
  dividends: Dividend[] = [];
  purpose: DivPurpose;
  purposes: DivPurpose[]
  _group_name: any;
  _group_code: string;
  _member_name: string;
  _member_id_no: string;
  _membership_no: number;
  _group_id: number;
  _savings_total: number;
  _savings_bf: number;
  _total_savings: any;
  _group_savings_total: number;
  _group_savings_bf: number;
  _group_total_savings: number;

  //Div control
  public loanDiv: boolean = false
  public savingsDiv: boolean = false
  public withdrawDiv: boolean = false
  successMsg: string;
  errorMsg: any;
  loanrepays: any;
  _total_repay: number;
  _loan_bf: number;
  lrates: any;
  _loan_interest: number;
  _pendingMsg: string;
  adv_bf: number;
  _adv_loan_interest: number;
  _pendingLoansMsg: string;
  _pendingAdvMsg: string;
  new_active: boolean;
  _default: boolean;
  _default_amount: number;
  _date: Date;
  _total_payment: number;
  _total_payment_2: number;
  new_active_adv: boolean;
  _adv_default_amount: number;
  _adv_bf: any;
  _new_loan: boolean;
  adv_default: boolean;
  submitted: boolean = false;


  constructor(private title: Title, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private memberService: MemberService, private savingsService: SavingsService, private loanService: LoanService, private dividendService: DividendService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle)

    //Instanciate form
    this.dividendForm = this.formBuilder.group({
      group_id: [null],
      member_id: [null],
      member_savings: [null],
      group_total_shares: [null],
      trf: [null,[Validators.required]],
      d_rate: [null],
      shared_interest: [null],
      dividend_amount: [null],
      _action_name1: [null],
      _action_name2: [null],
      allocate_date: [null, [Validators.required]],
      group_total_shares_currency: [{ value: null, disabled: true }],
      _loans_bf: [0],
      _adv_bf: [0],
      adv_id_fk: [null],
      loan_id_fk: [null],
      _loan_principal: [null],
      _adv_principal: [null],
      adv_loan_interest: [null]

    })

    //this.trfRef.nativeElement.focus()

    //! fetch member by ID
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      //get member details
      this.memberService.getMemberById(id)
        .subscribe(data => {
          this.member = data;
          //! member personal details
          this._group_id = +this.member.map(function (a) { return a['group_id']; });
          this._group_name = this.member.map(function (a) { return a['group_name']; });
          this._group_code = this.member.map(function (a) { return a['group_code']; });
          //this._group_officer = this.member.map(function (a) { return a['group_officer']; });
          this._member_name = this.member.map(function (a) { return a['member_name']; });
          this._membership_no = +this.member.map(function (a) { return a['membership_no']; });
          this._member_id_no = this.member.map(function (a) { return a['member_id_no']; });
          //patch member id to hidden member id element
          //patch member id to form
          this.dividendForm.patchValue({
            member_id: id
          })
          console.log("Member id", id)
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
            this.dividendForm.patchValue({
              member_savings: this._total_savings
            })

            if (this._total_savings === 0) {
              this.formDisable()
            }
          })//?End member savings
          //?Begin Group Savings
          //FETCH SAVINGS BY GROUP ID
          this.savingsService.getSavingsByGId(this._group_id)
            .subscribe(data => {
              this.savings = data
              //console.log("This group savings", this.savings);
              //get total savings
              this._group_savings_total = +this.savings.reduce((result, a) => {
                var group_savings_amount = a.savings_amount;
                return result + group_savings_amount;
              }, 0);

              //get savings bf
              this._group_savings_bf = +this.savings.reduce((result, a) => {
                let group_savings_bf = a.savings_bf;
                return result + group_savings_bf;
              }, 0);

              //Get total savings bf
              this._group_total_savings = this._group_savings_total + this._group_savings_bf;
              let _currency = "KShs."
              let _group_total_currency = _currency + this._group_total_savings
              console.log(_group_total_currency)

              this.dividendForm.patchValue({
                group_total_shares_currency: _group_total_currency,
                group_total_shares: this._group_total_savings
              })
            })  //!End savings fetch 

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
          // this.spinner.hide()
        }); //!End Member Service
    });
  }//End ngOnInit()

 //get form control
  //get control
  get f() {
    return this.dividendForm.controls;
  }

  //Begin on trf amount change
  onAmountChange() {

    if (this.dividendForm.value.trf == "") {
      this.dividendForm.patchValue({
        shared_interest: "",
        d_rate: "",
        dividend_amount: ""
      })
    } else {
      //console.log("This has changed")
      let _total_interest = this.dividendForm.value.trf - this.dividendForm.value.group_total_shares
      let _shared_interest = _total_interest / 2
      let _div_rate = Math.round((_shared_interest / this.dividendForm.value.group_total_shares * 100) * 100) / 100
      let _dividend = this.dividendForm.value.member_savings * _div_rate / 100
      //console.log("Interest Shared",_total_interest)

      this.dividendForm.patchValue({
        shared_interest: _shared_interest,
        d_rate: _div_rate,
        dividend_amount: _dividend
      })
    }
  }

  //disable form
  formDisable() {
    this.dividendForm.get('trf').disable();
    this.dividendForm.get('shared_interest').disable();
    this.dividendForm.get('d_rate').disable();
    this.dividendForm.get('dividend_amount').disable();
    this.dividendForm.get('_action_name1').disable();
    this.dividendForm.get('_action_name2').disable();
    this.dividendForm.get('allocate_date').disable();
    this.errorMsg = "You do not qualify for any dividend"
  }




  save() {

    this.submitted = true;
        //return invalid errors
        if (this.dividendForm.invalid) { 
           return;
            console.log("Invalid")
        }

    console.log("This action", this.dividendForm.value._action_name1)
    const newDividend = {
      member_id_fk: this.dividendForm.value.member_id,
      dividend_amount: this.dividendForm.value.dividend_amount,
      dividend_rate: this.dividendForm.value.d_rate,
      //purpose_1: this.dividendForm.value._action_name1,
      //purpose_2: this.dividendForm.value._action_name2,
      //createdAt: this.dividendForm.value.allocate_date
    }

    this.dividendService.addDividend(newDividend)
      .subscribe(dividend => {
        //this.dividends.push(dividend);
        this.successMsg = "Dividend successfully submitted"

        this.dividendService.getDividends()
          .subscribe(data => {
            console.log("Data dividends", data)
            this.dividends = data;


            let _last_dividend = this.dividends[this.dividends.length - 1]

            console.log("THis dividend id is", _last_dividend.dividend_id)
          },
            error => this.errorMsg = error
          )
      })
  }

  golist() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.memberService.getMemberById(id)
        .subscribe(data => {
          this.members = data;
          for (let m of this.members) {
            console.log("this group id is", m.group_id_fk);
            this.router.navigate(['/group/dlist', m.group_id_fk]);
          }
        });
    });
  }; //end golist

  //go to details
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
  goLoan() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.router.navigate(['../../../loans/create', id], { relativeTo: this.route });
    });
  };

  //referesh list
  refresh() {
    this.ngOnInit();
  }

}
