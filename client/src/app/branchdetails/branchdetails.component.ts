import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Branch } from "../_models/Branch.1";
import { BranchService } from '../_services/branch.service';



@Component({
  selector: 'app-branchdetails',
  templateUrl: './branchdetails.component.html',
  styleUrls: ['./branchdetails.component.css'],
  
})
export class BranchdetailsComponent implements OnInit {

 
  
  branch: Branch;
  branchs: Branch[];
  branch_name: string;
  branch_code: string;
  branch_id: number;

  constructor(private route: ActivatedRoute,private router: Router, private branchService: BranchService) { }

  ngOnInit() {
    this.loadBranch();
    
  }

  loadBranch(){
      this.route.paramMap.subscribe((params: ParamMap) =>{
      let id = parseInt(params.get('id'));
      
      this.branch_id = id
      console.log(this.branch_id);
      
      this.branchService.getBranchById(this.branch_id)
      .subscribe(m =>{console.log(m);
        this.branch = m});
      console.log(this.branch);
      return this.branch;
      
      
  });
}




  goPrevious(){
    let previousId = this.branch_id - 1;
    this.router.navigate(['../',previousId], {relativeTo: this.route});
  }

  goNext(){
   let nextId = this.branch_id + 1;
   this.router.navigate(['../', nextId], {relativeTo: this.route});
  }

  goBack(){
    let selectedId = this.branch_id ? this.branch_id : null;
    this.router.navigate(['../', {id: selectedId}], {relativeTo: this.route});
  }
}

