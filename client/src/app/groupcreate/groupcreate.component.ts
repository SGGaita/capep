import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

import { BranchService } from '../_services/branch.service';
import { GroupService } from '../_services/group.service';
import { StaffService } from '../_services/staff.service';

import { Group } from '../_models/group';
import { Branch } from '../_models/Branch.1';
import { Staff } from '../_models/staff'

import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-groupcreate',
  templateUrl: './groupcreate.component.html',
  styleUrls: ['./groupcreate.component.css'],
  providers: [GroupService]

})
export class GroupcreateComponent implements OnInit {
  pageTitle = "CAPEP KENYA: Group create"
  maxDate = new Date().toJSON().slice(0,10);
  minDate = "2019-01-01";

  groupForm: FormGroup;

  group: Group;
  groups: Group[] = [];
  group_id: number;
  group_name: string;
  group_code: string;
  group_reg_date: Date;
  branch_id_fk: number;
  staff_id_fk

  branch: Branch;
  branchs: Branch[];
  branch_name: string;
  branch_code: string;

  staff: Staff;
  staffs: Staff[] = [];

  submitted = false;
  public errorMsg;
  public successMsg;


  constructor(private title:Title, private branchService: BranchService, private groupService: GroupService, private staffService: StaffService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.title.setTitle(this.pageTitle)

    this.groupForm = this.formBuilder.group(
      {
        group_name: [null, Validators.required],
        group_code: [null, Validators.required],
        group_location: [null],
        group_town: [null],
        branch_id_fk: [null, Validators.required],
        staff_id_fk: [null],
        group_reg_date: [null]
      });

    this.branchService.getBranch()
      .subscribe(branchs => this.branchs = branchs);

    this.staffService.getStaff()
      .subscribe(s => this.staffs = s);
  }

  get f() {
    return this.groupForm.controls;
  }


  save() {
    //console.log(this.groupForm.value);
    let startDate = new Date(this.groupForm.value.group_reg_date);
    //console.log((startDate));
    let endDate = new Date(this.groupForm.value.group_reg_date1);
    var dateDiff = +endDate.getMonth() - +startDate.getMonth();
    //console.log('date difference', dateDiff)
    this.submitted = true;
    if (this.groupForm.invalid) {
      return;
    }
    const newGroup = {
      group_name: this.groupForm.value.group_name,
      group_code: this.groupForm.value.group_code,
      group_location: this.groupForm.value.group_location,
      group_town: this.groupForm.value.group_town,
      branch_id_fk: this.groupForm.value.branch_id_fk,
      staff_id_fk: this.groupForm.value.staff_id_fk,
      group_reg_date: this.groupForm.value.group_reg_date
    }
    this.groupService.getGroup()
      .subscribe(groups => {
        console.log("this group date", this.groupForm.value.group_reg_date)
        if (groups.some(group => {
          return group.group_code === this.groupForm.value.group_code;
        })) {
          this.errorMsg = "Group with the same code already exist";
        } else {
          this.groupService.addGroup(newGroup)
            .subscribe(group => {
              this.groups.push(group);
              this.successMsg = "Group successfully submitted";
              //reset form after submit
              this.groupForm.reset();
              this.errorMsg = null;
              for (let i in this.groupForm.controls) {
                this.groupForm.controls[i].setErrors(null);
              }
            },
              //display a failure error
              error => this.errorMsg = error);
        }
      });
  }

  //form reset
  resetForm() {
    this.groupForm.reset()
    for (let i in this.groupForm.controls) {
      this.groupForm.controls[i].setErrors(null);
    }
  }

value(){
  console.log("This value", this.groupForm.value.branch_id_fk)
}



}
