import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoanRepayPeriodComponent } from '../loan-repay-period/loan-repay-period.component';

@Component({
  selector: 'app-loansmanager',
  templateUrl: './loansmanager.component.html',
  styleUrls: ['./loansmanager.component.css']
})
export class LoansmanagerComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
  }

  showRepayTerms(){
    this.router.navigate(['create'], {relativeTo: this.route})

  }

  addRepayTerms(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%"
    this.dialog.open(LoanRepayPeriodComponent, dialogConfig)

  }

}
