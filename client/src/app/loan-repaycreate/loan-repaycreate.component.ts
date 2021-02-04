import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LoanRepayPeriod } from '../_models/loan-repay-period';
import { LoanRepayPeriodService } from '../_services/loan-repay-period.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-loan-repaycreate',
  templateUrl: './loan-repaycreate.component.html',
  styleUrls: ['./loan-repaycreate.component.css']
})
export class LoanRepaycreateComponent implements OnInit {
  repayForm: FormGroup;

  repayPeriod: LoanRepayPeriod;
  repayPeriods: LoanRepayPeriod[] = [];

  public errorMsg;

  constructor(private loanrepayperiodService: LoanRepayPeriodService, private router: Router, private toastr: ToastrService, private route:ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<LoanRepaycreateComponent>) { }

  ngOnInit() {
    this.repayForm = new FormGroup(
      {
        min_range: new FormControl(null),
        max_range: new FormControl(null),
        repay_period: new FormControl(null),
      });
  }

  //Submit
  save() {
    this.dialogRef.close(this.repayForm.value);
    console.log(this.repayForm.value);
    const newRepayPeriod = {
      min_range: this.repayForm.value.min_range,
      max_range: this.repayForm.value.max_range,
      repay_period: this.repayForm.value.repay_period

    }
    console.log('these values are:', newRepayPeriod);
    this.loanrepayperiodService.addRepayPeriod(newRepayPeriod)
      .subscribe(repayPeriod => {
        console.log('this', repayPeriod);
        this.repayPeriods.push(repayPeriod);
      },
        //display a failure error
        (error) => {
        this.errorMsg = error
          //display a toast success message
          this.toastr.error('Failed to submit. Try again', 'CAPEP - KENYA')
        }),
      //display a toast success message
      this.toastr.success('Staff submitted successfully', 'CAPEP - KENYA');
    //refresh list
    this.router.navigate(['/loan-parameters/loan-repay'], {relativeTo: this.route});
  }

  //close the modal
  close() {
    this.dialogRef.close();
  }

}
