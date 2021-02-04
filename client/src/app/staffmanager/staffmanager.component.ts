import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StaffcreateComponent } from '../staffcreate/staffcreate.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-staffmanager',
  templateUrl: './staffmanager.component.html',
  styleUrls: ['./staffmanager.component.css']
})
export class StaffmanagerComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
  }



  createNewStaff() {
    this.router.navigate(['create'], { relativeTo: this.route });
  };

  showStafflist() {
    this.router.navigate(['list'], { relativeTo: this.route });
  };
}
