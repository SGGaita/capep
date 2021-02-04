import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SavingsService } from '../_services/savings.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GroupService } from '../_services/group.service';
import { LoanService } from '../_services/loan.service';
import { MemberService } from '../_services/member.service';
import { Member } from '../_models/member';
import { Group } from '../_models/group';
import { Saving } from '../_models/saving';
import { Loan } from '../_models/loan';

@Component({
    selector: 'app-savingscreate',
    templateUrl: './savingscreate.component.html',
    styleUrls: ['./savingscreate.component.css'],
    providers: [SavingsService]
})
export class SavingscreateComponent implements OnInit {
    @ViewChild('total', { static: false }) totalRef: ElementRef;

    pageTitle = "CAPEP KENYA : Savings Deposit"

    savingsForm: FormGroup;

    member: Member;
    members: Member[]
    group: Group;
    groups: Group[]
    loan: Loan;
    loans: Loan[];
    saving: Saving;
    savings: Saving[]
    _savings_bf: number;
    _savings_total: number;
    _total_savings: number;
    _group_id: string;
    _group_name: string;
    _group_code: string;
    _group_officer: string;
    _member_name: string;
    _member_id: string;
    _member_id_fk: string;
    _membership_no: number;
    _member_id_no: string;
    _loan_repay: any;
    loanrepays: any;
    _total_repay: number;
    _loan_bf: number;
    lrates: any;
    _loan_interest: number;
    _adv_bf: number;
    _adv_loan_interest: number;
    successMsg: string;
    errorMsg: any;
    public savingsBF: boolean = false
    _pendingMsg: string;
    _pendingAdvMsg: string;
    _pendingLoansMsg: string;
    group_id_fk: number;
    adv_bf: number;
    //group_id_fk2: number;
    maxDate: Date = new Date()

    submitted = false;
    loading = true
    _default_amount: number;
    _adv_default_amount: number;
    comment_status: number;

    //diable buttons
    checkPolicy: boolean = false;
    errorFBMsg: string;

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

    constructor(private spinner: NgxSpinnerService, private title: Title, private router: Router, private groupService: GroupService, private loanService: LoanService, private formBuilder: FormBuilder, private memberService: MemberService, private savingsService: SavingsService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.title.setTitle(this.pageTitle)
        //this.totalRef.nativeElement.focus()
        this.spinner.show()


        this.savingsForm = this.formBuilder.group({
            group_id: [null],
            group_name: [null],
            group_code: [null],
            group_officer: [null],
            member_id: [null],
            member_name: [null],
            membership_no: [null],
            member_id_no: [null],
            savings_bf: [0],
            total_payments: [null, [Validators.required, Validators.pattern("^[0-9]+$")]],
            _total_payments: [0],
            savings_amount: [0, [Validators.pattern("^[0-9]+$")]],
            principal_amount: [0, [Validators.pattern("^[0-9]+$")]],
            principal_adv: [0, [Validators.pattern("^[0-9]+$")]],
            loan_interest: [0],
            loan_interest_holder: [0],
            adv_loan_interest: [0],
            adv_interest_holder: [0],
            default_amount: [0, [Validators.pattern("^[0-9]+$")]],
            asante: [0, [Validators.pattern("^[0-9]+$")]],
            default: [0, [Validators.pattern("^[0-9]+$")]],
            default_submit: [0],
            default_repay: [0],
            savings_date: [null, [Validators.required]],
            loan_id_fk: [0],
            adv_id_fk: [0],
            savings_id_fk: [null],
            comments: [null],
            adv_default: [0],
            _adv_default_holder: [0],
            adv_balance: [0],
            registration_fee: [0],
            late_payment: [0],
            adv_bf:[0]

        });


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
                    this._member_id = this.member.map(a => a.member_id);
                    //this._group_officer = this.member.map(function (a) { return a['group_officer']; });
                    this._member_name = this.member.map(function (a) { return a['member_name']; });
                    this._membership_no = +this.member.map(function (a) { return a['membership_no']; });
                    this._member_id_no = this.member.map(function (a) { return a['member_id_no']; });
                    //patch member id to hidden member id element
                    this.savingsForm.patchValue({
                        member_id: this._member_id
                    })

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
                                        this._new_loan = false
                                        console.log("Loan id for normal loan", _loan.loan_id)
                                        this.savingsForm.patchValue({
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
                                                                this.savingsForm.patchValue({
                                                                    loan_interest: this._loan_interest,
                                                                    loan_interest_holder: this._loan_interest,
                                                                    default: 0,
                                                                    default_submit: 0
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
                                                            console.log("Loan start date", _new_date)
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
                                                                        this.savingsForm.patchValue({
                                                                            loan_interest: 0,
                                                                            loan_interest_holder: 0,
                                                                            default: this._default_amount,
                                                                            default_submit: this._default_amount
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

                                                                            this.savingsForm.patchValue({
                                                                                loan_interest: this._loan_interest,
                                                                                loan_interest_holder: this._loan_interest,
                                                                                default: 0,
                                                                                default_submit: 0
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
                                                                this.savingsForm.patchValue({
                                                                    loan_interest: 0,
                                                                    loan_interest_holder: 0,
                                                                    default: this._default_amount,
                                                                    default_submit: this._default_amount
                                                                });
                                                            } else {
                                                                console.log("Default amount is equal 0")
                                                                this._default = false
                                                                this._loan_bf = _loan.loan_amount - this._total_repay
                                                                this.loanService.getRates()
                                                                    .subscribe(data => {
                                                                        this.lrates = data;
                                                                        //console.log("this rates", this.lrates)
                                                                        for (let _lrates of this.lrates) {
                                                                            this._loan_interest = Math.round(((_lrates.normal_rate * this._loan_bf) / 100) / 5) * 5
                                                                            //console.log("loan interest", this._loan_interest)

                                                                            this.savingsForm.patchValue({
                                                                                loan_interest: this._loan_interest,
                                                                                loan_interest_holder: this._loan_interest,
                                                                                default: 0,
                                                                                default_submit: 0
                                                                            });
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
                                                        /**console.log("last total amount", this._total_payment)
                                                        console.log("second last total amount", this._total_payment_2)
                                                        console.log("last default amount", _last_default)
                                                        console.log("second last total amount", _last_default_2)*/


                                                        //get date of the last repay entry
                                                        let _last_date = new Date(this.loanrepays[this.loanrepays.length - 1].date_of_payment)
                                                        new Date((_last_date.setMonth(_last_date.getMonth() + 1) + _last_date.setDate(_last_date.getDate() + 14)))
                                                        console.log("Date of payment", _last_date)
                                                        //TODO Step 1: if last default_amount == 0
                                                        if (_last_default === 0) {
                                                            console.log("Last default is equal to 0")
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
                                                                            //console.log("this rates", this.lrates)
                                                                            for (let _lrates of this.lrates) {
                                                                                this._default_amount = Math.round(((_lrates.default_rate * this._loan_bf) / 100) / 5) * 5
                                                                                this.savingsForm.patchValue({
                                                                                    loan_interest: this._loan_interest,
                                                                                    loan_interest_holder: this._loan_interest,
                                                                                    default: this._default_amount,
                                                                                    default_submit: this._default_amount
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
                                                                                this.savingsForm.patchValue({
                                                                                    loan_interest: this._loan_interest,
                                                                                    loan_interest_holder: this._loan_interest,
                                                                                    default: 0,
                                                                                    default_submit: 0
                                                                                });
                                                                            }
                                                                        })
                                                                }//end check date
                                                            } else {//Payment total is greater than 0
                                                                console.log("Total pay is greater than 0 No default")
                                                                this._default = false
                                                                this._loan_bf = _loan.loan_amount - this._total_repay
                                                                this.loanService.getRates()
                                                                    .subscribe(data => {
                                                                        this.lrates = data;
                                                                        //console.log("this rates", this.lrates)
                                                                        for (let _lrates of this.lrates) {

                                                                            this._loan_interest = Math.round(((_lrates.normal_rate * this._loan_bf) / 100) / 5) * 5
                                                                            this.savingsForm.patchValue({
                                                                                loan_interest: this._loan_interest,
                                                                                loan_interest_holder: this._loan_interest,
                                                                                default: 0,
                                                                                default_submit: 0
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
                                                            this.savingsForm.patchValue({
                                                                loan_interest: 0,
                                                                loan_interest_holder: 0,
                                                                default: this._default_amount,
                                                                default_submit: this._default_amount
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
                                        this.savingsForm.patchValue({
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

                                                    //console.log("Advance loan amount", _adv_bf)
                                                    this.loanService.getRates()
                                                        .subscribe(data => {
                                                            this.lrates = data;
                                                            //console.log("this rates", this.lrates)
                                                            for (let _lrates of this.lrates) {
                                                                this._adv_loan_interest = Math.round(((_lrates.advance_rate * _adv_bf) / 100) / 10) * 10
                                                                console.log("loan interest", this._adv_loan_interest)
                                                                this.adv_bf = _adv_bf + this._adv_loan_interest
                                                                this.savingsForm.patchValue({
                                                                    adv_loan_interest: this._adv_loan_interest,
                                                                    adv_interest_holder: this._adv_loan_interest,
                                                                    _adv_default_holder: this._adv_default_amount,
                                                                    adv_balance: this._adv_default_amount,
                                                                    adv_bf: this.adv_bf 
                                                                });

                                                                //console.log("Advance loan amount", this.adv_bf)
                                                            }
                                                        })
                                                    //! End 1. if loan id is not found in repayment table 

                                                } else {//Repay is present
                                                    console.log("Advance repays present")
                                                    let _last_adv = +this.loanrepays[this.loanrepays.length - 1].total_payments
                                                    let _last_adv_date = new Date(this.loanrepays[this.loanrepays.length - 1].start_date)
                                                    console.log("Date of payment", _last_adv_date)
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
                                                        console.log("Total payment amount", _last_adv)
                                                        console.log("Total payment date", _last_adv_date)
                                                        //console.log("Todays date", this._date)
                                                        if (_last_adv === 0) {
                                                            // Evaluate date
                                                            if (this._date > _last_adv_date) {
                                                                console.log("Advance in default coz date is greate")
                                                                this.adv_default = true
                                                                //this._adv_loan_interest = 0
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
                                                                            this.savingsForm.patchValue({
                                                                                adv_bf: this.adv_bf ,
                                                                                adv_loan_interest: 0,
                                                                                adv_interest_holder: 0,
                                                                                _adv_default_holder: this._adv_default_amount,
                                                                                adv_balance: this._adv_default_amount
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

                                                                            this.savingsForm.patchValue({
                                                                                adv_bf: this.adv_bf ,
                                                                                adv_loan_interest: this._adv_loan_interest,
                                                                                adv_interest_holder: this._adv_loan_interest,
                                                                                _adv_default_holder: this._adv_default_amount,
                                                                                adv_balance: this._adv_default_amount
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

                                                                        this.savingsForm.patchValue({
                                                                            adv_bf: this.adv_bf ,
                                                                            adv_loan_interest: this._adv_loan_interest,
                                                                            adv_interest_holder: this._adv_loan_interest,
                                                                            _adv_default_holder: this._adv_default_amount,
                                                                            adv_balance: this._adv_default_amount
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
                                                                            this.savingsForm.patchValue({
                                                                                adv_bf: this.adv_bf ,
                                                                                adv_loan_interest: 0,
                                                                                adv_interest_holder: 0,
                                                                                _adv_default_holder: this._adv_default_amount,
                                                                                adv_balance: this._adv_default_amount
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
                                                                            this.savingsForm.patchValue({
                                                                                adv_bf: this.adv_bf ,
                                                                                adv_loan_interest: 0,
                                                                                adv_interest_holder: 0,
                                                                                _adv_default_holder: temp_default_amount,
                                                                                adv_balance: temp_default_amount
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
                                                            //!Relook at this bit 
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
                                                                                    this.savingsForm.patchValue(
                                                                                        {
                                                                                            adv_bf: this.adv_bf ,
                                                                                            adv_loan_interest: 0,
                                                                                            adv_interest_holder: 0,
                                                                                            _adv_default_holder: this._adv_default_amount,

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
                                                                                    this.savingsForm.patchValue(
                                                                                        {
                                                                                            adv_bf: this.adv_bf ,
                                                                                            adv_loan_interest: this._adv_loan_interest,
                                                                                            adv_interest_holder: this._adv_loan_interest,
                                                                                            _adv_default_holder: 0,
                                                                                            adv_balance: 0
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
                                                                                this.savingsForm.patchValue(
                                                                                    {
                                                                                        adv_bf: this.adv_bf ,
                                                                                        adv_loan_interest: this._adv_loan_interest,
                                                                                        adv_interest_holder: this._adv_loan_interest,
                                                                                        _adv_default_holder: 0,
                                                                                        adv_balance: 0
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
                                        console.log("Pending normal loan")
                                        this.savingsForm.patchValue({
                                            loan_interest: 0,
                                            default: 0
                                        });
                                    }
                                }
                            }
                        })//!End loan fetch 
                    this.spinner.hide()
                }); //!End Member Service





        });
    }
    //End ngOnit


    //get control
    get f() {
        return this.savingsForm.controls;
    }



    default_balance() {
        var _default_submit = this.savingsForm.value.default - this.savingsForm.value.default_repay
        var _default_amount = this.savingsForm.value.default

        if (+this.savingsForm.value.default_repay == 0 || this.savingsForm.value.default_repay === "") {

            this.savingsForm.patchValue({
                default_submit: _default_amount

            })
        } else if (+this.savingsForm.value.default_repay > 0) {
            this.savingsForm.patchValue({
                default_submit: _default_submit
            })

        }
    }

    adv_default_balance() {
        var _default_submit = this.savingsForm.value._adv_default_holder - this.savingsForm.value.adv_default
        var _adv_default_amount = this.savingsForm.value._adv_default_holder
        /**if ( this.savingsForm.value.adv_default ==="" ){
            this.savingsForm.patchValue({
                adv_default: 0
            })
        }*/
        /**if (+this.savingsForm.value._adv_default_holder === 0){
            this.savingsForm.patchValue({
                adv_balance: 0
            })
        }*/

        if (+this.savingsForm.value.adv_default == 0) {
            this.savingsForm.patchValue({
                adv_balance: _adv_default_amount
            })
        } else if (+this.savingsForm.value.adv_default > 0) {
            this.savingsForm.patchValue({
                adv_balance: _default_submit
            })
        } else if (+this.savingsForm.value.adv_default > 0) {
            this.savingsForm.patchValue({
                adv_balance: 0
            })
        }
    }

    //new savings 
    newMemberSavings() {
        //this.spinner.show()
        //check if form is submitted
        this.submitted = true;
        //return invalid errors
        if (this.savingsForm.invalid) {
           return;
            console.log("Invalid")
        }
        //savings
        /***/var _savings_amount = this.savingsForm.value.savings_amount
        var _total_payments = this.savingsForm.value.total_payments
        var _savings_date = this.savingsForm.value.savings_date
        var _default_amount = this.savingsForm.value.default_amount
        var _comments = this.savingsForm.value.comments
        /**if (_comments != "") {
             this.comment_status = 1
             console.log("comment status", this.comment_status)
         } else {
             this.comment_status = 0
             console.log("comment status", this.comment_status)
         } */

        //loan
        var _loan_id_fk = this.savingsForm.value.loan_id_fk
        var _principal_amount = this.savingsForm.value.principal_amount
        var _loan_interest = this.savingsForm.value.loan_interest
        var _loan_default_amount = this.savingsForm.value.default_submit
        var _date_of_payment = this.savingsForm.value.savings_date

        //advance
        var _adv_id_fk = this.savingsForm.value.adv_id_fk
        var _principal_adv = this.savingsForm.value.principal_adv
        var _adv_interest = this.savingsForm.value.adv_loan_interest
        var _asante = this.savingsForm.value.asante
        var adv_default_amount = this.savingsForm.value.adv_balance



        this.route.paramMap.subscribe((params: ParamMap) => {
            let id = parseInt(params.get('id'));
            this.savingsService.getSavingsById(id)
                .subscribe(data => {
                    this.savings = data;
                    //check if member exist
                    let _memberExists = this.savings.some(saving => {
                        return saving.member_id_fk = id
                    })

                    if (!_memberExists) {
                        console.log("Savings I dont")
                        //submit  zero for brought forward row
                        const newSavings = {
                            member_id_fk: id,
                            total_payments: +0,
                            savings_amount: +0,
                            savings_bf: 0,
                            savings_date: _savings_date,
                            default: _default_amount,
                            comments: _comments
                        }
                        this.savingsService.addSavings(newSavings)
                            .subscribe(data => {
                                this.successMsg = "Record submitted successfully"
                            },
                                error => this.errorMsg = error)

                        ///submit actual savings
                        const newSavings2 = {
                            member_id_fk: id,
                            savings_amount: _savings_amount,
                            total_payments: _total_payments,
                            savings_date: _savings_date,
                            default: _default_amount,
                            comments: _comments,
                            comment_status: this.comment_status
                        }
                        this.savingsService.addSavings(newSavings2)
                            .subscribe(data => {
                                this.successMsg = "Record submitted successfully"
                                //this.ngOnInit()
                            },
                                error => this.errorMsg = error)

                    } else {
                        console.log("savings I do")
                        const newSavings = {
                            member_id_fk: id,
                            savings_amount: _savings_amount,
                            total_payments: _total_payments,
                            savings_date: _savings_date,
                            default: _default_amount,
                            comments: _comments,
                            comment_status: this.comment_status
                        }
                        this.savingsService.addSavings(newSavings)
                            .subscribe(data => {
                                console.log(data)
                                this.savingsService.getSavingsById(id)
                                    .subscribe(data => {
                                        this.savings = data
                                        let _last = +this.savings[this.savings.length - 1].savings_id
                                        console.log("Last id ", _last)
                                        this.savingsForm.patchValue({
                                            savings_id_fk: _last
                                        })


                                        if (+_loan_id_fk > 0) {
                                            const loanRepay = {

                                                loan_id_fk: _loan_id_fk,
                                                savings_id_fk: _last,
                                                principal_amount: _principal_amount,
                                                interest: _loan_interest,
                                                default_amount: _loan_default_amount,
                                                date_of_payment: _date_of_payment
                                            }
                                            this.loanService.addRepayment(loanRepay)
                                                .subscribe(data => {
                                                    console.log("This submitted repay1", data)
                                                    //this.successMsg = "Record submitted successfully"
                                                },
                                                    error => this.errorMsg = error);
                                        }

                                        //submit advance
                                        console.log("Advance loan id", +this.savingsForm.value.adv_id_fk)
                                        if (+_adv_id_fk > 0) {
                                            const advRepay = {
                                                loan_id_fk: _adv_id_fk,
                                                savings_id_fk: _last,
                                                principal_amount: _principal_adv,
                                                interest: _adv_interest,
                                                asante: _asante,
                                                default_amount: adv_default_amount,
                                                date_of_payment: _date_of_payment


                                            }
                                            this.loanService.addRepayment(advRepay)
                                                .subscribe(data => {
                                                    console.log("This submitted repay2", data)
                                                    //this.successMsg = "Record submitted successfully"
                                                },
                                                    error => this.errorMsg = error
                                                )
                                        }
                                        //end submit advance 
                                        // this.ngOnInit()
                                    })
                                this.successMsg = "Record submitted successfully"
                                this.ngOnInit()
                            }, error => this.errorMsg = error)
                    }
                    this.spinner.hide()
                    this.ngOnInit()

                })
        })



    }// End savings

    reset() {
        for (let i in this.savingsForm.controls) {
            this.savingsForm.controls[i].setErrors(null);
        }

        this.savingsForm.patchValue({
            savings_date: null,
            total_payments: null,
            savings_amount: null,
            savings_bf: null,
            principal_amount: null,
            principal_adv: null,
            default_amount: null,
            comments: null
        })
    }

    //submit savings
    addMemberSavings() {
        //submit savings
        this.newMemberSavings()
    }


    //form elements disable
    formDisable() {
        this.savingsForm.get('savings_amount').disable()
    }


    //Monitor change in state of the total payment element
    Totalpaychange() {

        if (+this.savingsForm.value.total_payments == 0) {

            this.savingsForm.patchValue({
                _total_payments: 0,
                savings_amount: 0,
                principal_amount: 0,
                principal_adv: 0,
                loan_interest: 0,
                adv_loan_interest: 0,
                asante: 0,
                default_amount: 50,
                adv_default: 0
            })
            //disable form
            //this.formDisable()
        } else {
            this.savingsForm.patchValue({
                loan_interest: this.savingsForm.value.loan_interest_holder,
                adv_loan_interest: this.savingsForm.value.adv_interest_holder,

                //adv_default: this.savingsForm.value._adv_default_holder
            })
        }

    }




    //check if value of savings amount is zero ore null auto populate default_amount element with 50
    savingsChange() {
        if (+this.savingsForm.value.total_payments > 0) {
            if (this.savingsForm.value.savings_amount == 0 || this.savingsForm.value.savings_amount === '') {
                this.savingsForm.patchValue({
                    default_amount: 50
                })
            } else {
                this.savingsForm.patchValue({
                    default_amount: 0
                })
            }
            this.errorFBMsg = ""
        } else {
            this.savingsForm.patchValue({
                default_amount: 50
            })

            //? this.errorFBMsg = "This amount is not valid as the total payment value is 0"
        }

    }
    //check if advance has been paid of, if not popilate asante element with the value of 10
    advChange() {
        let adv_balance = this.savingsForm.value.adv_bf - this.savingsForm.value.principal_adv;

        console.log("This value", adv_balance)
        if (adv_balance > 0 && adv_balance < +this.savingsForm.value.adv_bf ) {
            this.savingsForm.patchValue({
                asante: 10
            })
        } else {
            this.savingsForm.patchValue({
                asante: 0
            })
        }
    }


    //navigation
    golist() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            let id = parseInt(params.get('id'));
            this.memberService.getMemberById(id)
                .subscribe(data => {
                    this.members = data;
                    for (let m of this.members) {
                        console.log("this group id is", m.group_id_fk);
                        this.router.navigate(['/group/slist', m.group_id_fk]);
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
    goLoan() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            let id = parseInt(params.get('id'));
            this.router.navigate(['../../../loans/create', id], { relativeTo: this.route });
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

    //refresh list
    refresh() {
        this.ngOnInit();
    }

    //next  function
    move(advance = true) {
        this.route.paramMap.subscribe((params: ParamMap) => {
            let id = parseInt(params.get('id'));
            this.memberService.getMemberById(id)
                .subscribe(data => {
                    this.member = data;
                    this.group_id_fk = +this.member.map(a => a.group_id_fk);
                    let member_id = +this.member.map(a => a.member_id)
                    console.log("Member id", this.group_id_fk);
                    this.memberService.getMemberGId(this.group_id_fk)
                        .subscribe(data => {
                            this.members = data;
                            //console.log("This group members", this.members)
                            var idx = this.members.map(a => a.member_id).indexOf(member_id);
                            console.log("Member index 2", idx);
                            idx = (idx + (advance ? 1 : -1) + this.members.length) % this.members.length;
                            var currentID = this.members[idx].member_id
                            this.router.navigate(['../', currentID], { relativeTo: this.route });

                        })
                })
        })
    }

    //next function
    next() {
        this.move()
    }

    //previous function
    previous() {
        this.move(false)
    }


}
