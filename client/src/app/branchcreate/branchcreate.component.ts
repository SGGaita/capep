import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { BranchService } from '../_services/branch.service';


import { Branch } from "../_models/Branch.1";
import { ToastrService } from 'ngx-toastr';

declare var M: any;

@Component({
  selector: 'app-branch',
  templateUrl: './branchcreate.component.html',
  styleUrls: ['./branchcreate.component.css'],
  providers: [BranchService]
})
export class BranchcreateComponent implements OnInit {
  branchForm: FormGroup;
  submitted = false;

  branch: Branch;
  branchs: Branch[] = [];
  branch_id: number;
  branch_name: string;
  branch_code: string;
  branch_description: string;

  public errorMsg;
  successMsg: string;



  constructor(private branchService: BranchService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  save() {
    const newBranch = {
      branch_name: this.branchForm.value.branch_name,
      branch_code: this.branchForm.value.branch_code,
      branch_description: this.branchForm.value.branch_code,
    }
    this.branchService.addBranch(newBranch)
      .subscribe(branch => {
        this.branchs.push(branch);
        //reset form after submit
        this.branchForm.reset();
        //display a toast success message
        this.toastr.success('Branch submitted successfully', 'CAPEP - KENYA');

      },
        //display a failure error
        error => this.errorMsg = error);
    //display a toast success message
    this.toastr.error('Failed to submit. Try again', 'CAPEP - KENYA')

  }

  ngOnInit() {

    this.branchForm = this.formBuilder.group({
      branch_name: [null, Validators.required],
      branch_code: [null, Validators.required, Validators.minLength[3]],
      branch_description: [null]
    })


  }

  get bF() {
    return this.branchForm.controls;
  }

  formReset(){
    this.branchForm.reset()
  }


  addBranch() {
    this.submitted = true;
    if (this.branchForm.invalid) {
      return;
    }
    const newBranch = {
      branch_name: this.branchForm.value.branch_name,
      branch_code: this.branchForm.value.branch_code,
      branch_description: this.branchForm.value.branch_description,

    }
    this.branchService.addBranch(newBranch)
      .subscribe(data => {
        this.successMsg = "Record submitted successfully"

        this.formReset()
        for (let i in this.branchForm.controls) {
          this.branchForm.controls[i].setErrors(null);
        }
      },
        error => this.errorMsg = error
      )

  }

  resetForm(branchForm) {
    this.branchForm.reset()
  }
}