import { Component, OnInit } from '@angular/core';
import { LoanRates } from '../_models/loan-rates';
import { LoanRatesService } from '../_services/loan-rates.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loan-rateslist',
  templateUrl: './loan-rateslist.component.html',
  styleUrls: ['./loan-rateslist.component.css']
})
export class LoanRateslistComponent implements OnInit {
  rate: LoanRates;
  rates: LoanRates[] = [];

  public errorMsg;

  //Popover dialogue
  public popoverTitle: string = "Record Delete Confirmation";
  public popoverMessage: string = "Do you really want to delete?";
  public cancelClicked: boolean = false;

  constructor(private loanratesService: LoanRatesService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    //refresh list
  this.loanratesService.getRates()
  .subscribe(rates => this.rates = rates);
  }


  onSelectEdit(rate) {
    this.router.navigate(['loan-rates/edit', rate.rate_id]);
  }

  removelistElement(rate) {
    this.loanratesService.deleteRates(rate.rate_id)
      .subscribe(g => {
        this.rates.splice(this.rates.indexOf(rate), 1);
      }, (error) => {
        console.log(error);
      }
      );
    this.toastr.success('Group deleted successfully', 'CAPEP - KENYA');
    this.loanratesService.getRates()
      .subscribe(rates => this.rates = rates);
  }

}
