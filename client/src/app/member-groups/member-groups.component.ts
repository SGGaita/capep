import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GroupService } from '../_services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Group } from '../_models/group';
import { MemberService } from '../_services/member.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-member-groups',
  templateUrl: './member-groups.component.html',
  styleUrls: ['./member-groups.component.css']
})
export class MemberGroupsComponent implements OnInit {
  pageTitle = "CAPEP KENYA: Members:Groups list";

  public searchText: string;
  public searchGname: string;
  public searchGcode: string

  group: Group;
  groups: Group[]
  members: any;
  new_group: (Group & { member_count: number; })[];

  constructor(private spinner: NgxSpinnerService, private title: Title, private groupService: GroupService, private memberService: MemberService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    /** spinner starts on init */
    this.spinner.show();

    this.groupService.getGroup()
      .subscribe(groups => {
      this.groups = groups;
      console.log("new group", this.groups)
        //get group membership
        this.memberService.getMembers()
        .subscribe(data => {
          this.members = data;

          let hash = {};
          this.new_group = this.groups.map(o => Object.assign(hash[o.group_id] = {}, o, { member_count: 0 }));         
          this.members.forEach(({ group_id_fk }) => hash[group_id_fk].member_count++);          
        })

        /** spinner hides on data loaded */
        this.spinner.hide()
      }
      );
  }

  onSelect(group) {
    //this.router.navigate(['/branch', branch.branch_id]);
    this.router.navigate(['../mlist', group.group_id], { relativeTo: this.route });
  }

  goSavings() {
    this.router.navigate(['group/sgroups']);
  }

  goLoans() {
    this.router.navigate(['group/lgroups']);
  }

  goDividends() {
    this.router.navigate(['group/dgroups']);
  }

  //referesh list
  refresh() {
    this.ngOnInit();
  }

}
