import { Component, OnInit } from '@angular/core';
import { LoanRepayPeriodService } from '../_services/loan-repay-period.service';
import { LoanRepayPeriod } from '../_models/loan-repay-period';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loan-repaylist',
  templateUrl: './loan-repaylist.component.html',
  styleUrls: ['./loan-repaylist.component.css']
})
export class LoanRepaylistComponent implements OnInit {

  repayPeriod: LoanRepayPeriod;
  repayPeriods: LoanRepayPeriod[] = [];

//Popover dialogue
  public popoverTitle: string = "Record Delete Confirmation";
  public popoverMessage: string = "Do you really want to delete?";
  public cancelClicked: boolean = false;

  constructor(private loanrepayperiodService: LoanRepayPeriodService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  //refresh list
  this.loanrepayperiodService.getRepayPeriod()
  .subscribe(repayPeriods => this.repayPeriods = repayPeriods);
}


onSelectEdit(repayPeriod) {
this.router.navigate(['loan-repay/edit', repayPeriod.period_id]);
}

removelistElement(repayPeriod) {
this.loanrepayperiodService.deleteRepayPeriod(repayPeriod.period_id)
  .subscribe(g => {
    this.repayPeriods.splice(this.repayPeriods.indexOf(repayPeriod), 1);
  }, (error) => {
    console.log(error);
  }
  );
this.toastr.success('Period has been deleted successfully', 'CAPEP - KENYA');
this.loanrepayperiodService.getRepayPeriod()
  .subscribe(repayPeriods => this.repayPeriods = repayPeriods);
}

}
