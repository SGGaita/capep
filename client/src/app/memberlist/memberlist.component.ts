import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//service import
import { MemberService } from '../_services/member.service';
//model import
import { Member } from '../_models/member';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { GroupService } from '../_services/group.service';
import { AuthenticationService } from '../auth/authentication.service';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {
  pageTitle = 'CAPEP KENYA : Members list';

  public searchMnumber: string;
  public searchMname: string;

  member: Member;
  members: Member[];
  member_id: number;
  group_id_fk: number;
  member_name: string;
  member_id_no: string;
  membership_no: string;
  occupation: string;
  phone_number: string;
  postal_address: string;
  postal_code: string;
  location: string;
  town: string;
  passport_image: string;
  id_image: string;
  signature_image: string;
  next_kin_name: string;
  next_kin_relation: string;
  next_id_number: string;
  next_phone_number: string;
  next_location: string;
  next_town: string;

  public selectedId;

  


  //Popover dialogue
  public popoverTitle: string = "Record Delete Confirmation";
  public popoverMessage: string = "Do you really want to delete?";
  public cancelClicked: boolean = false;
  errorMsg: any;
  group_id: number;
  group: any;

  constructor(private spinner: NgxSpinnerService,private title: Title, private auth: AuthenticationService, private memberService: MemberService, private groupService: GroupService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    //set page title
    this.title.setTitle(this.pageTitle);

    //show spinner
    this.spinner.show()
    //load members
    this.getGroupMembership();
    //load group information
    this.loadGroup();

    var today = new Date().toJSON().slice(0,10);
    console.log("Todays date", today)
  }


  getGroupMembership() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.memberService.getMemberByGId(id)
        .subscribe(data => {
          this.members = data;
          console.log("this members", this.members)
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

  onSelect(member) {
    //this.router.navigate(['/branch', branch.branch_id]);
    this.router.navigate(['../../member', member.member_id], { relativeTo: this.route });
  };

 

  onSelectEdit(member) {
    this.router.navigate(['../../member/edit', member.member_id], { relativeTo: this.route });
  };

  removelistElement(member) {
    this.memberService.deleteMember(member.member_id)
      .subscribe(g => {
        this.members.splice(this.members.indexOf(member), 1);

      this.ngOnInit()
      }, (error) => {
        console.log(error);
      }
      );
    this.toastr.success('Record deleted successfully', 'CAPEP - KENYA');
  }

  //navigate to group list
  grouplist() {
    this.router.navigate(['group/mgroups']);
  };

  newMember()
  {
    this.router.navigate(['group/members/create']); 
  }

  //refresh list
  refresh(){
    this.ngOnInit()
  }

  goSavings() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.router.navigate(['group/slist', id]);
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

}
