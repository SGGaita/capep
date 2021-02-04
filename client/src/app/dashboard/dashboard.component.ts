import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BranchService } from '../_services/branch.service';
import { GroupService } from '../_services/group.service';
import { MemberService } from '../_services/member.service';
import { SavingsService } from '../_services/savings.service';
import { Group } from '../_models/group';
import { Branch } from '../_models/Branch.1';
import { Member } from '../_models/member';
import { AuthenticationService, TokenPayload, UserDetails } from '../auth/authentication.service';
import { Role } from '../_models/role';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pageTitle = "CAPEP KENYA : Dashboard"

  branch: Branch;
  branchs: Branch[];
  group: Group;
  groups: Group[]
  member: Member;
  members: Member[]
  branches_count: number;
  groups_count: number;
  members_count: number;

  credentials: TokenPayload = {
    //user_id: 0,
    staff_id_fk: 0,
    userName: '',
    email: '',
    password: '',
    roles: ''
  }

  details: UserDetails;
  savings: any;
  _savings_total: number;
  _savings_bf: number;
  _total_savings: any;
  _branch_name: string[];
  _branch_id: number[];
  _branch_id_fk: number[];
  _branch_ids: number[];
  branch_count: number[];

  constructor(private auth: AuthenticationService, private title: Title, private branchService: BranchService, private groupService: GroupService, private memberService: MemberService, private savingsService: SavingsService) { }


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    
  };

 
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];
  //public barChartPlugins =[pluginDatalabels]

  public dynamicColors(){
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

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
          //console.log('This Months array', allDates);
          //console.log('This new',allDates.getMonth())
        }
        //console.log('This are the savings total', this.savings_total);
        //console.log('This are the savings', this.savings);
        //console.log('Total count', this.savings.length);
      })

    //call get group count by  branch
    this.getgroupcountByBranch()

  }
  savings_total(arg0: string, savings_total: any) {
    throw new Error("Method not implemented.");
  }

  //group total by branch
  getgroupcountByBranch() {
    this.branchService.getBranch()
      .subscribe(data => {
        this.branchs = data;
        this.groupService.getGroup()
          .subscribe(data => {
            this.groups = data;
            //console.log("This groups", this.groups)

            let hash = {};
            let new_branch = this.branchs.map(o => Object.assign(hash[o.branch_id] = {}, o, { group_count: 0 }));
            this.groups.forEach(({ branch_id_fk }) => hash[branch_id_fk].group_count++);
           // console.log("New branch", new_branch)

            this.barChartLabels = new_branch.map(a=> a.branch_name)
            this.branch_count = new_branch.map(a=>a.group_count)
            //console.log("Branch name", this.barChartLabels);
            //console.log("Branch count", this.branch_count);
            this.barChartData =  [{data: this.branch_count, label: 'Branches', backgroundColor: 'rgb(220, 53, 69)'}]

            //let result = Array.from(this.groups
            // .reduce(
            //    (m, { branch_id_fk }) => m.set(branch_id_fk, m.get(branch_id_fk) + 1),
            //    new Map(this.branchs.map(({ branch_id }) => [branch_id, 0]))
            //  )
            //  .values()                
            // );
            //console.log("count results are", result)

            //test 2
            //let counts = [];

            //this.branchs.forEach((item, index) => {
            // console.log("Count 1",item.branch_id)
            //let count = 0;
            //this.groups.forEach((item2, index) => {
            // if (item['branch_id'] === item2['branch_id_fk']) {
            // count++;
            //}
            // })
            // counts.push(count);
            //count = 0;
            // console.log("Count number inside",counts)
            //})
            // console.log("Count number", counts)
            // console.log("New Branch", this.branchs)

          })
    // }

  })
}




}
