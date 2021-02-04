import { Component, OnInit } from '@angular/core';
import { LoanRatesService } from '../_services/loan-rates.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//import group
import {LoanRates} from '../_models/loan-rates';


@Component({
  selector: 'app-loan-rateupdate',
  templateUrl: './loan-rateupdate.component.html',
  styleUrls: ['./loan-rateupdate.component.css']
})
export class LoanRateupdateComponent implements OnInit {
  ratesUpdateForm: FormGroup;

  rate: LoanRates;
  rates: LoanRates [];

  errorMsg: any;
  rate_id: number;
  normal_rate: number[];
  advance_rate: number[];
  default_rate: number[];

  constructor(private loanrateService: LoanRatesService,  private router: Router, private toastr: ToastrService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.ratesUpdateForm = new FormGroup(
      {
        normal_rate: new FormControl(null),
        advance_rate: new FormControl(null),
        default_rate: new FormControl(null),
      });


      //fetch branch by id 
      this.route.paramMap.subscribe((params: ParamMap) =>{
        let id = parseInt(params.get('id'));
        this.loanrateService.getRatesById(id)
        .subscribe(m =>{
          this.rate_id = id;
           this.rates = m;
           this.normal_rate = this.rates.map(function (a) {return a['normal_rate'];});//extract the property branch_name from branch object and initialize to var branchName
           this.advance_rate = this.rates.map(function (a) {return a['advance_rate'];});
           this.default_rate = this.rates.map(function (a) {return a['default_rate'];});
          
          //Patch the form with the values of the selected ID
           this.ratesUpdateForm.patchValue({
            normal_rate: this.normal_rate,
            advance_rate: this.advance_rate,
            default_rate: this.default_rate,
            
        }); 
  });                 
});//end of fetch branch by id 
  }

}
