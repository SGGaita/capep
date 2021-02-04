import { Component, OnInit, Inject } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GroupcreateComponent } from '../groupcreate/groupcreate.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,private dialog: MatDialog) { }

  ngOnInit() {
  }

  addGroup(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%"
    this.dialog.open(GroupcreateComponent, dialogConfig)

  }

  showGrouplist(){
    this.router.navigate(['list'], {relativeTo: this.route})
  }


}
