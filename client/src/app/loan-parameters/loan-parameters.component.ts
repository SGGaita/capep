import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { LoanRatecreateComponent } from '../loan-ratecreate/loan-ratecreate.component';
import { LoanRepaycreateComponent } from '../loan-repaycreate/loan-repaycreate.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loan-parameters',
  templateUrl: './loan-parameters.component.html',
  styleUrls: ['./loan-parameters.component.css']
})
export class LoanParametersComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,private dialog: MatDialog) { }

  ngOnInit() {
  }

  

  addParameter(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%"
    this.dialog.open(LoanRepaycreateComponent, dialogConfig)

  }

  addNewRate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%"
    this.dialog.open(LoanRatecreateComponent, dialogConfig)
  }

  showrateslist(){
    this.router.navigate(['loan-rates'], {relativeTo: this.route});

  }

  showParameterslist(){
    this.router.navigate(['loan-repay'], {relativeTo: this.route});
  }

}
