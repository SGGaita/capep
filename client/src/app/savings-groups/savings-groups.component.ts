import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GroupService } from '../_services/group.service';
import { MemberService } from '../_services/member.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Group } from '../_models/group';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-savings-groups',
  templateUrl: './savings-groups.component.html',
  styleUrls: ['./savings-groups.component.css']
})
export class SavingsGroupsComponent implements OnInit {
  pageTitle = "CAPEP KENYA: Savings: Groups list";

  public searchText: string;
  public searchGname: string;
  public searchGcode: string;

  group: Group;
  groups: Group[];
  //Popover dialogue
  popoverTitle = "Record Delete Confirmation";
  popoverMessage = "Do you really want to delete?";
  cancelClicked = false;
  selectedId: number;
  group_id_fk: number;
  members: any;
  total_members: any;
  errorMsg: any;


  constructor(private spinner: NgxSpinnerService,private title: Title, private groupService: GroupService, private memberService: MemberService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle)

    //spinner show
    this.spinner.show()
    
    this.groupService.getGroup()
      .subscribe(groups => { this.groups = groups; 
      
      this.spinner.hide()},
      error => this.errorMsg = error);

}


  onSelect (group) {
    //this.router.navigate(['/branch', branch.branch_id]);
    this.router.navigate(['../slist', group.group_id], { relativeTo: this.route });
  };

  isSelected(group) {
    return group.group_id === this.selectedId;
  }

  removelistElement(group) {
    this.groupService.deleteGroups(group.group_id)
      .subscribe(g => {
        this.groups.splice(this.groups.indexOf(group), 1);
      }, error => {
        console.log(error);
      });
    this.toastr.success('Group deleted successfully', 'CAPEP - KENYA');
    this.groupService.getGroup()
      .subscribe(groups => { this.groups = groups; });
  };

  

  goMembers() {
    this.router.navigate(['group/mgroups']);
  };

  goLoans() {
    this.router.navigate(['group/lgroups']);
  };

  goDividends() {
    this.router.navigate(['group/dgroups']);
  };

  grouplist() {
    this.router.navigate(['group/sgroups']);
  };

}
