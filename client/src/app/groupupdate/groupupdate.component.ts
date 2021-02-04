import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BranchService } from '../_services/branch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import group
import { Group } from '../_models/group';
import { GroupService } from '../_services/group.service';
import { Branch } from '../_models/Branch.1';
import { Staff } from '../_models/staff';
import { StaffService } from '../_services/staff.service';
import { ConfirmationPopoverWindowOptions } from 'angular-confirmation-popover/confirmation-popover-window-options.provider';

@Component({
  selector: 'app-groupupdate',
  templateUrl: './groupupdate.component.html',
  styleUrls: ['./groupupdate.component.css']
})
export class GroupupdateComponent implements OnInit {

  groupUpdateForm: FormGroup;

  group: Group;
  groups: Group[];
  branch: Branch;
  branchs: Branch[];
  group_id: number;
  group_name: string;
  group_code: string;
  group_location: string;
  group_town: string;
  branch_id_fk: string;

  staff: Staff;
  staffs: Staff[] = [];
  errorMsg: any;
  successMsg: any;

  constructor(private _location: Location, private groupService: GroupService, private staffService: StaffService, private branchService: BranchService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.groupUpdateForm = new FormGroup(
      {
        group_name: new FormControl(null),
        group_code: new FormControl(null),
        group_location: new FormControl(null),
        group_town: new FormControl(null),
        branch_id_fk: new FormControl(null)

      });

    this.branchService.getBranch()
      .subscribe(branchs => this.branchs = branchs);

    this.staffService.getStaff()
      .subscribe(s => this.staffs = s);



    //fetch branch by id 
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.groupService.getGroupById(id)
        .subscribe(m => {
          this.group_id = id;
          this.group = m;
          this.group_name = this.group.map(function (a) { return a['group_name']; });//extract the property branch_name from branch object and initialize to var branchName
          this.group_code = this.group.map(function (a) { return a['group_code']; });
          this.group_location = this.group.map(function (a) { return a['group_location']; });
          this.group_town = this.group.map(function (a) { return a['group_town']; });
          this.branch_id_fk = this.group.map(function (a) { return a['branch_id_fk']; });

          //Patch the form with the values of the selected ID
          this.groupUpdateForm.patchValue({
            branch_id_fk: this.branch_id_fk,
            group_name: this.group_name,
            group_code: this.group_code,
            group_location: this.group_location,
            group_town: this.group_town
          });
        });
    });//end of fetch branch by id 


  }


  //Update 
  updateGroup() {

    this.groupService.updateGroup(this.group_id, this.groupUpdateForm.value)
      .subscribe(results => {
        console.log(results)
        this.successMsg = "Group information successfully updated";
      },
        error => this.errorMsg = error);
  }

  //navigation
  back(){
    this._location.back()
  }

}
