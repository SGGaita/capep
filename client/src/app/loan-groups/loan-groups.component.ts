import { Component, OnInit } from '@angular/core';
import { Group } from '../_models/group';
import { Title } from '@angular/platform-browser';
import { GroupService } from '../_services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-loan-groups',
  templateUrl: './loan-groups.component.html',
  styleUrls: ['./loan-groups.component.css']
})
export class LoanGroupsComponent implements OnInit {
  pageTitle = "CAPEP KENYA: Loans: Groups list";

  public searchText: string;
  public searchGname: string;
  public searchGcode: string

  group: Group;
  groups: Group[]
  selectedId: any;
  errorMsg: any;


  constructor(private spinner: NgxSpinnerService,private title: Title, private groupService: GroupService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.spinner.show()

    this.groupService.getGroup()
      .subscribe(groups => { this.groups = groups
      this.spinner.hide() },
      error => this.errorMsg = error);
  }


  onSelect(group) {
    //this.router.navigate(['/branch', branch.branch_id]);
    this.router.navigate(['../llist', group.group_id], { relativeTo: this.route });
  }

  isSelected(group) {
    return group.group_id === this.selectedId;
  }

  onSelectEdit(group) {
    this.router.navigate(['group/edit', group.group_id]);
  }

  goMembers() {
    this.router.navigate(['group/mgroups']);
  }
  goSavings() {
    this.router.navigate(['group/sgroups']);
  }
  goDividends() {
    this.router.navigate(['group/dgroups']);
  }
}


