import { Component, OnInit } from '@angular/core';
import { LoanService } from '../_services/loan.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BranchService } from '../_services/branch.service';

@Component({
  selector: 'app-branch-new-loans',
  templateUrl: './branch-new-loans.component.html',
  styleUrls: ['./branch-new-loans.component.css']
})
export class BranchNewLoansComponent implements OnInit {
  pageTitle = "CAPEP KENYA: New  Group Loans"
  loans: any = [];
  newArr: { group_id: unknown; branch_name: any; group_name: any; }[];
  branch: any;
  branch_name: string;

  constructor(private loanService: LoanService, private title: Title, private route: ActivatedRoute, private router: Router, private branchService: BranchService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle)
//branch name
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
      this.loanService.getLoanNewBid(id)
        .subscribe(data => {
          this.loans = data;
          console.log("These groups", this.loans)
          this.newArr = Array.from(new Set(this.loans.map(x => x.group_id)))
          .map(id => {
            return {
              group_id: id,
              branch_name: this.loans.find(x => x.group_id === id).branch_name,
              group_name: this.loans.find(x => x.group_id === id).group_name,
              //count: this.loans.find(x=>x.group_id === id).length
            }
          })//end const newArr
          console.log("This new array ", this.newArr)
        })
    })
  }

  //navigation
  groupnewloans(loan){
    console.log(loan.group_id)
    this.router.navigate(['../../../group/new', loan.group_id], { relativeTo: this.route });
  }


  

  //navigation
  declinedLoans(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      console.log(id)
      this.router.navigate(['../../../branch/declined', id], { relativeTo: this.route });
    })
  }

  acceptedLoans(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.router.navigate(['../../../branch/accepted', id], { relativeTo: this.route });
    })
  }
  
  back(){
    this.router.navigate(['../../../branches'], { relativeTo: this.route });
  
  }
  //refresh
  refresh(){
    this.ngOnInit()
  }
}
