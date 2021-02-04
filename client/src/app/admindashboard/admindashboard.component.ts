import { Component, OnInit } from '@angular/core';
import { BranchService } from '../_services/branch.service';
import { GroupService } from '../_services/group.service';
import { Title } from '@angular/platform-browser';
import { MemberService } from '../_services/member.service';
import { SavingsService } from '../_services/savings.service';
import { Branch } from '../_models/branch';
import { Member } from '../_models/member';
import { Saving } from '../_models/saving';
import { Group } from '../_models/group';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  pageTitle = "CAPEP KENYA : Admin Dashboard";

  branch: Branch;
  branchs: Branch[];
  member: Member;
  members: Member[]
  group: Group;
  groups: Group[];
  saving: Saving;
  savings: Saving[]
  branches_count: number;
  groups_count: number;
  members_count: number;
  savings_total: number;
  _savings_total: number;
  _savings_bf: number;
  _total_savings: any;


  constructor(private branchService: BranchService, private groupService: GroupService, private memberService: MemberService, private savingsService: SavingsService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle)

    // Branch count
    this.branchService.getBranch()
      .subscribe(data => {
        this.branchs = data;
        this.branches_count = this.branchs.length;
      });
    // Group count
    this.groupService.getGroup()
      .subscribe(data => {
        this.groups = data;
        this.groups_count = this.groups.length;
      });
    // Members count
    this.memberService.getMembers()
      .subscribe(data => {
        this.members = data;
        this.members_count = this.members.length;
      });
    //Savings total
    this.savingsService.getSavings()
      .subscribe(data => {
        this.savings = data;
        //get total savings
        this._savings_total = +this.savings.reduce((result, a) => {
          var savings_amount = a.savings_amount;
          return result + savings_amount;
        }, 0);
        //get savings bf
        this._savings_bf = +this.savings.reduce((result, a) => {
          let savings_bf = a.savings_bf;
          return result + savings_bf;
        }, 0);
        //Get total savings bf
        this._total_savings = this._savings_total + this._savings_bf
        for (let s of this.savings) {
          let allDates = new Date(s.savings_date)
          //let allDates1 = [s.savings_date]
          //console.log('This Months 1',s.savings_date);
          console.log('This Months array', allDates);
          //console.log('This new',allDates.getMonth())
        }
        console.log('This are the savings total', this.savings_total);
        console.log('This are the savings', this.savings);
        console.log('Total count', this.savings.length);
      })
  }

}
