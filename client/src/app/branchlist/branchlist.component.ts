import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


//Import service
import { BranchService } from '../_services/branch.service';
import { Branch } from "../_models/Branch.1";
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

declare var M: any;

@Component({
  selector: 'app-branchlist',
  templateUrl: './branchlist.component.html',
  styleUrls: ['./branchlist.component.css'],

})
export class BranchlistComponent implements OnInit {
  pageTitle = "CAPEP KENYA : Branch list"


  branch: Branch;
  branchs: Branch[] = [];
  branch_name: string;
  branch_code: string;
  branch_description: string;
  branch_id: number;

  p: number = 1;
  collection: any[] = this.branchs;

  public selectedId;

  //Popover dialogue
  public popoverTitle: string = "Record Delete Confirmation";
  public popoverMessage: string = "Do you really want to delete?";
  public cancelClicked: boolean = false;

  constructor(private title: Title, private branchService: BranchService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }


  ngOnInit() {
    this.title.setTitle(this.pageTitle)

    this.branchService.getBranch()
      .subscribe(branchs => this.branchs = branchs);

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.selectedId = id;
    });
  }

  removelistElement(branch) {
    this.branchService.deleteBranch(branch.branch_id)
      .subscribe(g => {
        this.branchs.splice(this.branchs.indexOf(branch), 1);
        this.toastr.success('Branch deleted successfully', 'CAPEP - KENYA');
        this.branchService.getBranch()
          .subscribe(branchs => this.branchs = branchs);
      }, (error) => {
        console.log(error);
      }
      );

  }

  onSelect(branch) {
    //this.router.navigate(['/branch', branch.branch_id]);
    this.router.navigate([branch.branch_id], { relativeTo: this.route });
  }

  isSelected(branch) {
    return branch.branch_id === this.selectedId;
  }

  onSelectEdit(branch) {
    this.router.navigate(['branch/edit', branch.branch_id]);
  }

  refresh(){
    this.ngOnInit()
  }
}
