import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { LoanService } from '../_services/loan.service';
import { MemberService } from '../_services/member.service';
import { SavingsService } from '../_services/savings.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-savings-details',
  templateUrl: './savings-details.component.html',
  styleUrls: ['./savings-details.component.css']
})
export class SavingsDetailsComponent implements OnInit {
  pageTitle = "CAPEP - KENYA : Savings Details"

  savingsupdateForm: FormGroup;

  savings: any;
  _member_id: any;
  loans: any;
  member: any;
  _group_name: any;
  _member_name: any;
  _group_code: any;
  _membership_no: any;
  _member_id_no: any;
  _dateJoined: any;

  _currency_sym: any = "KShs."
  _savings_total: number;
  _savings_bf: number;
  _total_savings: any;
  
  loanrepays: any;
  _total_repay: number;
  _loan_bf: number;
  lrates: any;
  _loan_interest: number;
  _pendingMsg: string;
  _adv_bf: number;
  _adv_loan_interest: number;
  _savings_date: any;
  _updated_at: any;
  _total_payments: any;
  _saving_amount: any;
  _comments: any;
  successMsg: string;
  errorMsg: any;
  rloans: any;
  loan_type: any;
  principal_amount: any;
  interest: any;
  _default: any;
  _asante: any;
  _fines: any;
  _fine: any;

  submit: boolean = false
  update_date: Date = new Date()


  constructor(private title: Title, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private loanService: LoanService, private memberService: MemberService, private savingsService: SavingsService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    //Initialize  form
    this.savingsupdateForm = this.formBuilder.group({
      group_id: [null],
      group_name: [null],
      group_code: [null],
      group_officer: [null],
      member_id: [null],
      member_name: [null],
      membership_no: [null],
      member_id_no: [null],
      savings_bf: [0],
      savings_bf2: [0],
      loans_bf: [null],
      adv_bf: [null],
      total_payments: [null],
      savings_amount: [null],
      principal_amount: [null],
      principal_adv: [null],
      loan_interest: [null],
      adv_loan_interest: [null],
      fines: [null],
      savings_date: [null],
      loan_id_fk: [null],
      adv_id_fk: [null],
      comments: [null],
      asante: [null],
      default: [null],
      default_adv: [null],
      loan_type_id: [null]
    });



    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      console.log("Savings id", id)
      this.savingsService.getSavingsBySId(id)
        .subscribe(data => {
          console.log("The savings", data)
          this.savings = data;
          this._member_id = this.savings.map(a => a.member_id_fk);
          this._total_payments = this.savings.map(a => a.total_payments);
          this._saving_amount = this.savings.map(a => a.savings_amount);
          this._savings_date = this.savings.map(a => a.savings_date);
          this._updated_at = this.savings.map(a => a.updated_at);
          this._comments = this.savings.map(a => a.comments);
          this._fines = this.savings.map(a => a.default_amount)



          const sDate = new Date(this._savings_date);

          this.savingsupdateForm.patchValue({
            savings_date: sDate.toISOString().substring(0, 10),
            total_payments: this._total_payments,
            savings_amount: this._saving_amount,
            comments: this._comments,
            fines: this._fines

          });

          //console.log("Members id", this._member_id)
          this.memberService.getMemberById(this._member_id)
            .subscribe(data => {
              this.member = data;
              this._group_name = this.member.map(a => { return a.group_name });
              this._group_code = this.member.map(a => { return a.group_code });
              this._member_name = this.member.map(a => { return a.member_name })
              this._member_id_no = this.member.map(a => { return a.member_id_no })
              this._member_name = this.member.map(a => { return a.member_name })
              this._membership_no = +this.member.map(a => { return a.membership_no });
              this._dateJoined = this.member.map(a => { return a.dateJoined });

              //!fetch member savings
              this.savingsService.getSavingsById(this._member_id).subscribe(s => {
                this.savings = s
                //get total savings
                this._savings_total = +this.savings.reduce((result, a) => {
                    let savings_amount = a.savings_amount;
                    return result + savings_amount;
                }, 0);
                //get savings bf if there is any savings is found in the savings bf column in DB
                this._savings_bf = +this.savings.reduce((result, a) => {
                    let savings_bf = a.savings_bf;
                    return result + savings_bf
                }, 0); //end savings bf
                //get savings default value from default bf column in DB
                let _default_bf = +this.savings.reduce((result, a) => {
                    let default_value = a.default;
                    return result + default_value
                }, 0)
                //get total savings bf
                this._total_savings = this._savings_total + this._savings_bf - _default_bf;
                console.log("Total savings", this._total_savings)
            })//!End savings fetch 


            })
        })
      //end get savings

      //get loan repay by savings id
      this.loanService.getRepaymentsSID(id)
        .subscribe(data => {
          this.rloans = data;
          this.loan_type = +this.rloans.map(a => a.loan_type_id_fk)
          this.principal_amount = this.rloans.map(a => a.principal_amount);
          console.log("The pricipal amount array is", this.principal_amount)
          //this.interest = this.rloans.map(a => a.interest);
          this._default = this.rloans.map(a => a.default_amount),
          console.log("24th August default amount", this._default[0])
            this._asante = this.rloans.map(a => a.asante),
            console.log("Rloans",this.rloans)

            console.log("Asante", this._asante)
           let _interest = this.rloans.filter(x=>  {return x.loan_type_id_fk === 1})
           console.log("INterest", _interest)
           console.log("Loan default amount 24th", this._default[0])
          if (this.loan_type === 1) {
            this.savingsupdateForm.patchValue({
              loan_interest: this.interest,
              principal_amount: this.principal_amount[0],
              default: this._default[0],
              loan_type_id: 1
            })
      
          } else {
            this.savingsupdateForm.patchValue({
              //adv_loan_interest: this.interest,
              principal_adv: this.principal_amount,
              default_adv: this._default[1],
              asante: this._asante,
              loan_type_id: 2
            })
          }


        })

      //get loans
      //BEGIN LOAN FETCH
      this.loanService.getloanById(id)
        .subscribe(data => {
          this.loans = data;
          // console.log("This member's loans are", this.loans)
          let _last = this.loans[this.loans.length - 1]
          //get repayment
          for (let _loans of this.loans) {
            //begin longterm
            if (_last && _loans.loan_status === 1 && _loans.loan_type_id_fk === 1) {
             
              //console.log("This loan is long term active", _loans.loan_id)
              this.loanService.getRepaymentsID(_loans.loan_id)
                .subscribe(data => {
                  this.loanrepays = data;
                  //console.log("Repays for this loan ", this.loanrepays)
                  if (this.loanrepays.some(_loan => {
                    return _loan.loan_id_fk === _loans.loan_id;
                  })) {
                    for (let _loan_repay of this.loanrepays) {
                      // console.log("This loan repays amount", _loan_repay.principal_amount)
                      //get total repay
                      this._total_repay = +this.loanrepays.reduce((result, a) => {
                        let _principal_amount = a.principal_amount;
                        return result + _principal_amount;
                      }, 0);
                      //console.log("Total repayment", this._total_repay)
                    }
                    this._loan_bf = _loans.loan_amount - this._total_repay;
                    //console.log("Total loan bf is", this._loan_bf)
                    //Get interest repayment
                    this.loanService.getRates()
                      .subscribe(data => {
                        this.lrates = data;
                        //console.log("this rates", this.lrates)
                        for (let _lrates of this.lrates) {
                          this._loan_interest = (_lrates.normal_rate * this._loan_bf) / 100
                          //console.log("loan interest", this._loan_interest)
                          
                        }
                      })
                  } else {
                    this._loan_bf = _loans.loan_amount;
                    this.loanService.getRates()
                      .subscribe(data => {
                        this.lrates = data;
                        //console.log("this rates", this.lrates)
                        for (let _lrates of this.lrates) {
                          this._loan_interest = (_lrates.normal_rate * this._loan_bf) / 100
                          //console.log("loan interest", this._loan_interest)
                          
                        }
                      })
                    // console.log("This new loan", this._loan_bf)                  
                  }
                })
            } else {
              this._loan_bf = 0
              this._loan_interest = 0
              
            }
            //Pending loans
            if (_last && _loans.loan_status === 0 && _loans.loan_type_id_fk === 1) {
              this._pendingMsg = "" + _loans.loan_amount
            }

            //End Long Term

            //begin advance
            if (_last && _loans.loan_status === 1 && _loans.loan_type_id_fk === 2) {
              //console.log("This loan is advance active", _loans.loan_id)
              
              this.loanService.getRepaymentsID(_loans.loan_id)
                .subscribe(data => {
                  this.loanrepays = data;
                  //console.log("Repays for this advance loan ", this.loanrepays)
                  if (this.loanrepays.some(_loan => {
                    return _loan.loan_id_fk === _loans.loan_id;
                  })) {
                    for (let _loan_repay of this.loanrepays) {
                      // console.log("This advance loan repays amount", _loan_repay.principal_amount)
                      //get total repay
                      this._total_repay = +this.loanrepays.reduce((result, a) => {
                        let _principal_amount = a.principal_amount;
                        return result + _principal_amount;
                      }, 0);
                      //console.log("Total advance repayment", this._total_repay)
                    }
                    this._adv_bf = _loans.loan_amount - this._total_repay;
                    // console.log("Total adv bf is", this._adv_bf)
                    //Get interest repayment
                    this.loanService.getRates()
                      .subscribe(data => {
                        this.lrates = data;
                        //console.log("this rates", this.lrates)
                        for (let _lrates of this.lrates) {
                          this._adv_loan_interest = (_lrates.advance_rate * this._adv_bf) / 100
                          //console.log("loan interest", this._loan_interest)
                          
                        }
                      })
                  } else {
                    this._adv_bf = _loans.loan_amount;
                  }
                })
            } else {
              this._adv_bf = 0
            }
            //End advance
          }
        })
      //END LOAN FETCH                 
    });


  }

  //Navigation
  memberDetails() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.savingsService.getSavingsBySId(id)
        .subscribe(data => {
          console.log("Savingsis", data)
          this.savings = data;
          for (let s of this.savings) {
            console.log("meber id", s.member_id)
            this.router.navigate(['../../', s.member_id], { relativeTo: this.route })
          }


        })
    })
  }

  //update 
  updateMemberSavings() {
    this.submit = true
    var _loan_type = this.savingsupdateForm.value.loan_type_id
    //normal loan
    var _principal_amount = this.savingsupdateForm.value.principal_amount
    var _loan_interest = this.savingsupdateForm.value.loan_interest
    var _default_amount = this.savingsupdateForm.value.default_amount
    //advance loan
    var _principal_adv = this.savingsupdateForm.value.principal_adv
    var _adv_loan_interest = this.savingsupdateForm.value.adv_loan_interest
    var _default_adv = this.savingsupdateForm.value.default_adv
    var _asante = this.savingsupdateForm.value.asante

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));

      console.log("Item ID", id)

      this.savingsService.updateSavings(id, this.savingsupdateForm.value)
        .subscribe(data => { console.log(data) })
      //update loan repay
      if(_loan_type == 1){
        const repayUpdate = {
          principal_amount: _principal_amount,
          interest: _loan_interest,
          default_amount: _default_amount,
          update_at: this.update_date
        }  
      }else{
        const repayUpdate = {
          principal_amount: _principal_adv,
          interest: _adv_loan_interest,
          default_amount: _default_adv,
          asante:_asante,
          update_at: this.update_date
}

        this.loanService.updateRepayment(id, repayUpdate)
        .subscribe(data => {
          console.log("loan repay", data)
          this.successMsg ="Records submitted successfully"
          this.submit = false;
          this.ngOnInit()
        }, error=> this.errorMsg = error)  
      }
   })
  }

  //refresh
  refresh() {
    this.ngOnInit()
  }


}
