import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SavingsService } from '../_services/savings.service';
import { MemberService } from '../_services/member.service';
import { GroupService } from '../_services/group.service';
import { Saving } from '../_models/saving';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-savings-members-list',
  templateUrl: './savings-members-list.component.html',
  styleUrls: ['./savings-members-list.component.css']
})
export class SavingsMembersListComponent implements OnInit {
  pageTitle = "CAPEP KENYA: Savings: Members list";

  public searchMnumber: string;
  public searchMname: string;
  group_id: number;
  member: Member;
  members: Member[]
  saving: Saving;
  savings: Saving[];
  errorMsg: any;
  group: any;

  _currency_sym ="KShs."
  _savings_total: number;
  _savings_bf: number;
  total_savings: any;

  constructor(private spinner: NgxSpinnerService,private title: Title, private route: ActivatedRoute, private router: Router, private savingsService: SavingsService, private memberService: MemberService, private groupService: GroupService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
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
         
          //get members savings

          //hide spinner
          this.spinner.hide()
          
        },
          //display a failure error
          error => {
            this.errorMsg = error;
            console.log("this error", this.errorMsg)
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
  };

  //Member Savings begin

  onSelect(member) {
    //this.router.navigate(['/branch', branch.branch_id]);
    this.router.navigate(['../../savings/create/', member.member_id], { relativeTo: this.route });
  };

  goMembers() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.router.navigate(['group/mlist', id]);
    });
  };

  goLoans() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.router.navigate(['group/llist', id]);
    });
  };

  goDividends() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.router.navigate(['group/dlist', id]);
    });
  };

  grouplist() {
    this.router.navigate(['group/sgroups']);
  };

  onSelectHistory(member) {
    //this.router.navigate(['/branch', branch.branch_id]);
    this.router.navigate(['../../member', member.member_id], { relativeTo: this.route });
};

onSelectBF(member){
  this.router.navigate(['../../records/create',member.member_id], {relativeTo: this.route})
}

//refresh list
refresh(){
  this.ngOnInit()
}

}
