import { Component, OnInit } from '@angular/core';
import { LoanService } from '../_services/loan.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BranchService } from '../_services/branch.service';
import { Branch } from '../_models/Branch.1'

@Component({
  selector: 'app-branch-accepted-loans',
  templateUrl: './branch-accepted-loans.component.html',
  styleUrls: ['./branch-accepted-loans.component.css']
})
export class BranchAcceptedLoansComponent implements OnInit {

  pageTitle = "CAPEP KENYA: Accepted Group Loans"
  loans: any = [];
  accArr: { group_id: unknown; branch_name: any; group_name: any; }[];
  branch: Branch;
  branch_name: any;
  constructor(private loanService: LoanService, private branchService:  BranchService, private title: Title, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle)
    this.getbranch()
    //loan  new loans
    this.getGroupLoans()
  }

  //get branch name
  getbranch(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
    this.branchService.getBranchById(id)
    .subscribe(data =>{
      this.branch = data;
      this.branch_name = this.branch.map(a => a.branch_name)      
    })
    })
  }

  //get groups
  getGroupLoans() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.loanService.getLoanDecBid(id)
        .subscribe(data => {
          this.loans = data;
          console.log("These groups accepted loans", this.loans)
          
          this.accArr = Array.from(new Set(this.loans.map(x => x.group_id)))
          .map(id => {
            return {
              group_id: id,
              branch_name: this.loans.find(x => x.group_id === id).branch_name,
              group_name: this.loans.find(x => x.group_id === id).group_name,
              //count: this.loans.find(x=>x.group_id === id).length
            }
          })//end const newArr
          console.log("This accepted array ", this.accArr)
        })
    })
  }

  //navigation
  groupnewloans(loan){
    console.log(loan.group_id)
    this.router.navigate(['../../../group/accepted', loan.group_id], { relativeTo: this.route });
  }


  //navigation
//navigation
newLoans(){
  this.route.paramMap.subscribe((params: ParamMap) => {
    let id = parseInt(params.get('id'));
    console.log(id)
    this.router.navigate(['../../../branch/new', id], { relativeTo: this.route });
  })
}

declinedLoans(){
  this.route.paramMap.subscribe((params: ParamMap) => {
    let id = parseInt(params.get('id'));
    this.router.navigate(['../../../branch/declined', id], { relativeTo: this.route });
  })
}

  back(){
    this.router.navigate(['../../../branches'], { relativeTo: this.route });  
  }

  refresh(){
    this.ngOnInit()
  }


}
