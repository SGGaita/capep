import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Group } from '../_models/group';
import { GroupService } from '../_services/group.service';
import { Member } from '../_models/member';
import { MemberService } from '../_services/member.service';
import { SavingsService } from '../_services/savings.service';
import { Saving } from '../_models/saving';
import { LoanService } from '../_services/loan.service';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../auth/authentication.service';
import { DividendService } from '../_services/dividend.service';
import { Loan } from '../_models/loan';
import { LoanRepay } from '../_models/loan-repay';

@Component({
  selector: 'app-memberdetails',
  templateUrl: './memberdetails.component.html',
  styleUrls: ['./memberdetails.component.css']
})
export class MemberdetailsComponent implements OnInit {
  pageTitle = "CAPEP KENYA: Member Details";
  savingFilter: FormGroup;
  minDate = "2019-01-01";
  today = new Date()
  maxDate = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();

  public searchDate: string;

  group: Group;
  groups: Group[];
  member: Member;
  members: Member[];
  member_id: number;

  saving: Saving;
  savings: Saving[] = []
  balanceBF: number;
  savings1: any = [];
  loan: Loan;
  loans: Loan[];
  lrepay: LoanRepay;
  lrepays: LoanRepay[]
  status: string;
  statusClear: string;
  statusActive: string;
  _loan_repayed: number;
  _loan_bf: number;
  _appStatusApproved: string;
  _appStatusDeclined: string;
  activeLoans: any;
  memberDets: any;
  last_date: any;
  _group_id: string;
  _group_name: string;
  _group_code: string;
  _member_name: string;
  _membership_no: number;
  _member_id_no: string;
  _member_id: number;
  _dateJoined: any;
  _phone_number: string;
  _location: string;
  _town: string;
  _member_occupation: string;
  next_kin_name: string;
  next_relation: string;
  next_id_number: string;
  next_phone_number: string;
  next_location: string;
  next_town: string;
  _savings_total: number;
  _savings_bf: number;
  _total_savings: any;
  member_id_no: string;
  signature_image: string;
  loanrepays: any;
  _total_repay: number;
  lrates: any;
  _loan_interest: number;
  _pendingMsg: string;
  loanappForm: any;
  _adv_bf: number;
  _adv_loan_interest: number;
  _pendingAdvMsg: string;
  _pendingLoansMsg: string;
  loan_app: any = [];
  _longterm: string;
  _advance: string;
  feedmsg: string;

  _repay_vals: any = []
  _loan_id: any;

  update_date: Date = new Date()


  //Popover dialogue
  public popoverTitle: string = "Record Delete Confirmation";
  public popoverMessage: string = "Do you really want to delete?";
  public cancelClicked: boolean = false;
  dividends: any;
  loans_repay: any;
  _total_shares: number;
  savings_bf: any = [];
  errorMsg: any;

  constructor(private toastr: ToastrService, private location: Location, private auth: AuthenticationService, private formBuilder: FormBuilder, private title: Title, private loanService: LoanService, private route: ActivatedRoute, private router: Router, private savingsService: SavingsService, private groupService: GroupService, private memberService: MemberService, private dividendService: DividendService) {

  }



  ngOnInit() {
    this.title.setTitle(this.pageTitle)

    this.savingFilter = this.formBuilder.group({
      saving_value: [null]
    })

    this.loadGroup();
    //load member savings
    this.loadMemberSavings()
    //load loans
    this.loadloanApplication()
    //load dividends
    this.loadDividends()

  }

  loadGroup() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'))
      this.memberService.getMemberById(id)
        .subscribe(m => {
          this.member = m;
          //console.log("This records", this.member)
          this._group_id = this.member.map(function (a) { return a['group_id'] });
          this._group_name = this.member.map(function (a) { return a['group_name']; });
          this._group_code = this.member.map(function (a) { return a['group_code']; });
          this._member_name = this.member.map(function (a) { return a['member_name']; });
          this._membership_no = +this.member.map(function (a) { return a['membership_no']; });
          this._member_id_no = this.member.map(function (a) { return a['member_id_no']; });
          this._member_id = +this.member.map(function (a) { return a['member_id'] });
          this._member_id = +this.member.map(function (a) { return a['member_id'] });
          this._dateJoined = this.member.map(function (a) { return a['dateJoined'] });
          this._phone_number = this.member.map(function (a) { return a['phone_number'] });
          this._location = this.member.map(function (a) { return a['location'] });
          this._town = this.member.map(function (a) { return a['town'] });
          this._member_occupation = this.member.map(function (a) { return a['member_occupation'] });
          this.next_kin_name = this.member.map(function (a) { return a['next_kin_name'] });
          this.next_relation = this.member.map(function (a) { return a['next_relation'] });
          this.next_id_number = this.member.map(function (a) { return a['next_id_number'] });
          this.next_phone_number = this.member.map(function (a) { return a['next_phone_number'] });
          this.next_location = this.member.map(function (a) { return a['next_location'] });
          this.next_town = this.member.map(function (a) { return a['next_town'] });
          this.member_id_no = this.member.map(function (a) { return a['member_id_no'] });
          this.signature_image = this.member.map(function (a) { return a['signature_image'] });
        });
    });
  }


  //Fetch member savings
  loadMemberSavings() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.member_id = id
      this.savingsService.getSavingsById(this.member_id)
        .subscribe(data => {
          this.savings = data;
          //console.log("This member savings", this.savings);
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
          let _temp_savings_bf = this._savings_bf;
          let _temp_savings_bf2 = this._savings_bf;

          //get default bf
          let _default_bf = +this.savings.reduce((result, a) => {
            let default_value = a.default;
            return result + default_value;
          }, 0)

          let _savingsBF = this.savings.map(a => a.savings_amount);
          console.log("Saving Brought Foward", _savingsBF)

          let _default_amount = this.savings.map(a => a.default)
          console.log("Default amount", _default_amount)

          let arraC = _savingsBF.map((item, index) => {
            return item - _default_amount[index];
          })
          let arraD = arraC
          console.log("Deduction array", arraC)

          //get savings bf if any from savings BF column in DB
          this._savings_bf = +this.savings.reduce((result, a) => {
            let savings_bf = a.savings_bf;
            return result + savings_bf;
          }, 0);

          //total shares for  display
          this._total_shares = this._savings_total + this._savings_bf + _default_bf
          console.log("These are the total shares", this._total_shares)

          //Iterate through savings
          let _total_savings_bf = arraC.map(v => _temp_savings_bf += v);
          let _total_savings = arraD.map(v => _temp_savings_bf2 += v);
          console.log("unshifted", _total_savings_bf)


          _total_savings_bf.unshift(this._savings_bf)

          //Fetch savings bf
          var _bf_first = this.savings[0];
          console.log('bf first', _bf_first)
          if (_bf_first == null) {
            console.log('evaluate true')
            var _bf_value = 0
          } else {
            var _bf_value = +this.savings[0].savings_bf
          }

          console.log("_bf_value", _bf_value)
          if (_bf_value == 0) {
            this.savings_bf = []
          } else {


            this.savings_bf.push(_bf_first)
          }

          console.log("new savings bf array", this.savings_bf)

          // console.log("Total savings array", _total_savings)
          //push total savings  into the savings array
          this.savings.forEach((p, index) => p._savings_bf = _total_savings_bf[index])
          this.savings.forEach((p, index) => p._savings_total = _total_savings[index]);
          this.savings.shift()
          //this.savings.sort((a,b,) => a._savings_total - b._savings_total)
        })
    })
  }
  //End Savings 

  //load loans
  loadloanApplication() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      //fetch loans
      this.loanService.getloanById(id)
        .subscribe(data => {
          this.loan_app = data;
          this._loan_id = this.loan_app.map(a => a.loan_id)
          //console.log("This loan application", this.loan_app)
          //get loan repayment
          for (let _loan_app of this.loan_app) {
            this.loanService.getRepaymentsID(_loan_app.loan_id)
              .subscribe(data => {
                this.loanrepays = data;
                //find occurance and of approved loans
                console.log("loan status 1 ", this.loan_app)
                //filter to get with status 1
                let _status1 = this.loan_app.filter(x => {
                  return x.loan_status == 1
                })
                console.log("filtered", _status1);
                if (this.loanrepays.some(_loan => {
                  return _loan.loan_id_fk === _loan_app.loan_id;
                })) {

                  //get total repay
                  this._total_repay = +this.loanrepays.reduce((result, a) => {
                    let _principal_amount = a.principal_amount;
                    return result + _principal_amount;
                  }, 0);
                  console.log("Total repayed amount", this._total_repay)
                }

                //end if statement
                console.log("Total repay", this._total_repay)
                let _repay_array = this.loan_app.map(x => x.loan_amount - this._total_repay);
                console.log(_repay_array)
                //end filter
              })
          }
        })
    })

  }
  //end load loans

  loadDividends() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.dividendService.getDividendByMid(id)
        .subscribe(data => {
          this.dividends = data;
          console.log("These dividend", data)
        })
    })
  }



  //NAVIGATION
  //Savings details
  onSelectSaving(saving) {
    //console.log("This  loan id is navigate",loan.loan_id)
    this.router.navigate(['../savings-update', saving.savings_id], { relativeTo: this.route });
  }

  //savings bf
  onSelectSavingBf(_bf){
    this.router.navigate(['../savings_bf_update', _bf.savings_id], {relativeTo: this.route});
  }

  //Loans  Details
  onSelectApp(loan) {
    //console.log("This  loan id is navigate",loan.loan_id)
    this.router.navigate(['../loan-details', loan.loan_id], { relativeTo: this.route });
  }

  //Loan Edit
  onSelectEdit(loan) {
    this.router.navigate(['../loan-edit', loan.loan_id], { relativeTo: this.route })
  }

  //Navigate  back to group members list
  grouplist() {
    this.location.back()
  }

  //remove element from savings list
  removelistElement(saving) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      console.log("This saving id", saving.savings_id)

      this.savingsService.deleteSavings(saving.savings_id)
        .subscribe(g => {
          this.savings.splice(this.savings.indexOf(saving), 1);
          //
          this.toastr.success('Record deleted successfully', 'CAPEP - KENYA');
          this.ngOnInit()
        }, (error) => {
          console.log(error);
        }
        );

    })
  }

  //remove element from savings list
  removelistElementBF(_bf) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      console.log("This id is", id)
      console.log("This saving id", _bf.savings_id)

      //check if other savings already exist
      this.savingsService.getSavingsById(id)
        .subscribe(data => {
          this.savings = data
          console.log("data fetched", data)
          //get savings array length
          let _savings_size = this.savings.length
          console.log("Array length", _savings_size)
          let _memberExist = this.savings.some(saving => {
            return saving.member_id_fk = id
          })

          if (_memberExist && _savings_size > 1) {
            console.log("I will update", this.update_date)
            const updateSavings = {
              total_payments: 0,
              savings_amount: 0,
              savings_bf: 0,
              update_date: this.update_date,
            }
            this.savingsService.updateSavings(_bf.savings_id, updateSavings)
              .subscribe(data=>{console.log(data); this.ngOnInit(), error => this.errorMsg = error;
              console.log(this.errorMsg)})
          } else {
            console.log("i will delete")
            this.savingsService.deleteSavings(_bf.savings_id)
              .subscribe(g => {
                this.savings_bf.splice(this.savings_bf.indexOf(_bf), 1);
                //
                this.toastr.success('Record deleted successfully', 'CAPEP - KENYA');
                //this.ngOnInit()
              }, (error) => {
                console.log(error);
              }
              );
          }



        })
    })
  }

  //remove element loan
  removelistElementLoan(loan) {

    this.loanService.getRepayments()
      .subscribe(data => {
        console.log(data);
        this.lrepays = data;
        if (this.lrepays.some(loan_r => {
          return loan_r.loan_id_fk === loan.loan_id;
        })) {
          //delete any loan were loan id is 
          for (let loan_r of this.lrepays) {
            this.loanService.deleteRepayment(loan_r.loan_id_fk)
              .subscribe(data => {
                console.log(data)
                this.lrepays.splice(this.lrepays.findIndex(x => x.loan_id_fk === loan.loan_id), 1)

                //delete main loan
                this.loanService.deleteLoans(loan.loan_id)
                  .subscribe(g => {
                    console.log(g)
                    this.loan_app.splice(this.loan_app.indexOf(loan), 1);

                    this.ngOnInit()
                  }, (error) => {
                    console.log(error);
                  }
                  );
              })
          }
        } else {
          this.loanService.deleteLoans(loan.loan_id)
            .subscribe(g => {
              console.log(g)
              this.loan_app.splice(this.loan_app.indexOf(loan), 1);

              this.ngOnInit()
            }, (error) => {
              console.log(error);
            }
            );

        }
      })

    this.toastr.success('Record deleted successfully', 'CAPEP - KENYA');
    this.ngOnInit()
  }


  //refresh page
  refresh() {
    this.ngOnInit()
  }

}
