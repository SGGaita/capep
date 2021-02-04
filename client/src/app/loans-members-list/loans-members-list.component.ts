import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MemberService } from '../_services/member.service';
import { GroupService } from '../_services/group.service';
import { Member } from '../_models/member';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-loans-members-list',
  templateUrl: './loans-members-list.component.html',
  styleUrls: ['./loans-members-list.component.css']
})
export class LoansMembersListComponent implements OnInit {
  pageTitle = 'CAPEP KENYA : Members loans list';

  p : number = 1
  public searchMnumber: string;
  public searchMname: string;
  group_id: number;
  member: Member;
  members: Member[]
  errorMsg: any;
  group: any;
  loading = false;
  public loadingMsg = "Loading data...Please wait";

  constructor(private spinner: NgxSpinnerService, private title: Title, private route: ActivatedRoute, private router: Router, private memberService: MemberService, private groupService: GroupService) { }

  ngOnInit() {

    this.title.setTitle(this.pageTitle)
    //spinner show
    this.spinner.show()
    this.getGroupMembership();
    this.loadGroup();
  }

  getGroupMembership() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.memberService.getMemberByGId(id)
        .subscribe(data => {
          this.members = data;
          let _last_member = this.members[this.members.length - 1].member_id
          console.log("this members", this.members)
          console.log("This last member", _last_member)
          this.spinner.hide()
        },
          //display a failure error
          error => {
            this.errorMsg = error;
          }

        )
    });
  }

  loadGroup() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.group_id = id;
      console.log(this.group_id);
      this.groupService.getGroupById(this.group_id)
        .subscribe(m => {
          this.group = m;
        },
          //display a failure error
          error => { this.errorMsg = error; });
    });
  }

  onSelect(member) {
    //this.router.navigate(['/branch', branch.branch_id]);
    this.router.navigate(['../../loans/create/', member.member_id], { relativeTo: this.route });
  };

  onSelectHistory(member) {
    this.router.navigate(['../../member', member.member_id], { relativeTo: this.route });
  };

  grouplist() {
    this.router.navigate(['group/lgroups']);
  };

  goMembers() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.router.navigate(['group/mlist', id]);
    });
  };

  goSavings() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.router.navigate(['group/slist', id]);
    });
  };

  goDividends = function () {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.router.navigate(['group/dlist', id]);
    });
  }

  //referesh list
  refresh() {
    this.ngOnInit();
  }
}
