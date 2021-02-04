import { Component, OnInit } from '@angular/core';
import { BranchService } from '../_services/branch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Branch } from '../_models/Branch.1';

@Component({
  selector: 'app-branchedit',
  templateUrl: './branchedit.component.html',
  styleUrls: ['./branchedit.component.css']
})
export class BrancheditComponent implements OnInit {
  branchUpdateForm: FormGroup;

  branch: Branch;
  branchs: Branch[];
  branch_id: number;
  branch_name: string;
  branch_code: string;
  branch_description: string;

  
  public errorMsg;
  successMsg: string;

  constructor(private formBuilder: FormBuilder,private branchService: BranchService, private router: Router, private toastr: ToastrService,private route: ActivatedRoute) { }

  ngOnInit() {

    this.branchUpdateForm = this.formBuilder.group(
      {
        branch_name: [null,Validators.required],
        branch_code: [null,Validators.required],
        branch_description: [null,Validators.required],
      });

      
 //fetch branch by id 
      this.route.paramMap.subscribe((params: ParamMap) =>{
            let id = parseInt(params.get('id'));
            this.branchService.getBranchById(id)
            .subscribe(m =>{
              this.branch_id = id;
               this.branch = m;
               this.branch_name = this.branch.map(function (a) {return a['branch_name'];});//extract the property branch_name from branch object and initialize to var branchName
               this.branch_code = this.branch.map(function (b) {return b['branch_code'];});
               this.branch_description = this.branch.map(function (c) {return c['branch_description'];});

              //Patch the form with the values of the selected ID
               this.branchUpdateForm.patchValue({
                  branch_name: this.branch_name,
                  branch_code: this.branch_code,
                  branch_description: this.branch_description
            }); 
      });                 
    });//end of fetch branch by id 
  }
      


      //Update 
      updateBranch(){
        
        this.branchService.updateBranch(this.branch_id,this.branchUpdateForm.value)
        .subscribe( results =>
          {console.log(results)
            this.successMsg = "Record successfully updated"            
            //this.toastr.success('Branch submitted successfully', 'CAPEP - KENYA');
            //this.router.navigate(['branch/list']);
          },
          error => this.errorMsg = error);
              }
      
    

}
