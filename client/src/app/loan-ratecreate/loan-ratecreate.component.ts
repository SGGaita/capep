import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoanRates } from '../_models/loan-rates';
import { LoanRatesService } from '../_services/loan-rates.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { LoanService } from '../_services/loan.service';

@Component({
  selector: 'app-loan-ratecreate',
  templateUrl: './loan-ratecreate.component.html',
  styleUrls: ['./loan-ratecreate.component.css']
})
export class LoanRatecreateComponent implements OnInit {
  pageTitle = "CAPEP KENYA : Loan Parameters Manager"
  ratesForm: FormGroup;

  rate: LoanRates;
  rates: LoanRates[] = [];

  state = [{id:1,name:"Activate"},{id:2,name:"Suspend"}]

  public errorMsg;
  normal_rate: any;
  advance_rate: any;
  default_rate: any;
  long_term: any;
  adv_term: any;
  condition: any;
  group_months: any;
  group_membership: any;
  minimum_savings: any;
  successMsg: string;
  insurance_rate: any;


  constructor(private title: Title, private formBuilder: FormBuilder, private loanService: LoanService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    //
    this.state

    this.ratesForm = this.formBuilder.group(
      {
        normal_rate: [null, Validators.required],
        advance_rate: [null, Validators.required],
        default_rate: [null, Validators.required],
        insurance_rate: [null, Validators.required],
        group_months: [null, Validators.required],
        long_term: [null, Validators.required],
        adv_term: [null, Validators.required],
        group_membership: [null, Validators.required],
        minimum_savings: [null, Validators.required],
        loan_penalization_state:[null],
        loan_issuance_state:[null]
      });

    //form disable
    this.ratesForm.get('normal_rate').disable();
    this.ratesForm.get('advance_rate').disable();
    this.ratesForm.get('default_rate').disable();
    this.ratesForm.get('insurance_rate').disable();
    this.ratesForm.get('long_term').disable();
    this.ratesForm.get('adv_term').disable();
    this.ratesForm.get('group_months').disable();
    this.ratesForm.get('group_membership').disable();
    this.ratesForm.get('minimum_savings').disable();
    //end form disable

    //fetch loan rates
    this.loanService.getRates()
      .subscribe(m => {
        this.rate = m;
        console.log("from rates table", this.rate);
        this.normal_rate = this.rate.map(function (a) { return a['normal_rate']; }); //extract the property branch_name from branch object and initialize to var branchName
        this.advance_rate = this.rate.map(function (a) { return a['advance_rate']; });
        this.default_rate = this.rate.map(function (a) { return a['default_rate']; });
        this.insurance_rate = this.rate.map(a => a.insurance_rate);
        this.long_term = this.rate.map(function (a) { return a['long_term']; });
        this.adv_term = this.rate.map(function (a) { return a['adv_term']; });
        //Patch the form with the values of the selected ID
        this.ratesForm.patchValue({
          normal_rate: this.normal_rate,
          advance_rate: this.advance_rate,
          default_rate: this.default_rate,
          insurance_rate: this.insurance_rate,
          long_term: this.long_term,
          adv_term: this.adv_term
        })
      });
    //end of loan rates
    //fetch loan rates
    this.loanService.getLoanConditions()
      .subscribe(m => {
        this.condition = m;
        console.log("test conditions", this.condition);
        this.group_months = this.condition.map(function (a) { return a['group_months']; }); //extract the property branch_name from branch object and initialize to var branchName
        this.group_membership = this.condition.map(function (a) { return a['group_membership']; });
        this.minimum_savings = this.condition.map(function (a) { return a['minimum_savings']; });
        //Patch the form with the values 
        this.ratesForm.patchValue({
          group_months: this.group_months,
          group_membership: this.group_membership,
          minimum_savings: this.minimum_savings,
        });
      });
    //end of fetch 

  }  //End ngOnInit

  get f() {
    return this.ratesForm.controls;
  }

  edit() {
    this.ratesForm.get('normal_rate').enable();
    this.ratesForm.get('advance_rate').enable();
    this.ratesForm.get('default_rate').enable();
    this.ratesForm.get('insurance_rate').enable();
    this.ratesForm.get('long_term').enable();
    this.ratesForm.get('adv_term').enable();
    this.ratesForm.get('group_months').enable();
    this.ratesForm.get('group_membership').enable();
    this.ratesForm.get('minimum_savings').enable();
  };

  //Submit
  save() {
    console.log(this.ratesForm.value);
   // this.loanService.updateRates(this.ratesForm.value)
     // .subscribe(rate => {
       // console.log('this', rate);
       // this.successMsg = "Information successfully updated";
      //},
        //display a failure error
       // error => this.errorMsg = error);
    //loan conditions
    //this.loanService.updateConditions(this.ratesForm.value)
      //.subscribe(condition => {
        //console.log('this', condition);
        //this.successMsg = "Information successfully updated";
      //},
        //display a failure error
        //error => this.errorMsg = error);
  };


}
