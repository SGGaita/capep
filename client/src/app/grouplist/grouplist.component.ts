import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service'
import { NgxSpinnerService } from "ngx-spinner";


//Import service
import { GroupService } from '../_services/group.service';
//import model
import { Group } from '../_models/group';
import { ToastrService } from 'ngx-toastr';
import { Member } from '../_models/member';
import { MemberService } from '../_services/member.service';
import { Title } from '@angular/platform-browser';
import { SharedServiceService } from '../_services/shared_service/shared-service.service';
import { LogService } from '../_services/shared_service/log.service';

@Component({
  selector: 'app-grouplist',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent implements OnInit {
  pageTitle = "CAPEP KENYA : Group list"

  public searchText: string;
  public searchGname: string;
  public searchGcode: string;

  group: Group;
  groups: Group[] = [];
  group_id: number;
  group_name: string;
  group_code: string;
  group_created_at: Date;
  branch_id_fk: number;
  branch_name: string;
  branch_code: string;

  member: Member;
  members: Member[];
  group_id_fk: number;
  total_members: number;




  public selectedId;

  //Popover dialogue
  public popoverTitle: string = "Record Delete Confirmation";
  public popoverMessage: string = "Do you really want to delete?";
  public cancelClicked: boolean = false;
  groupsArray: any;
  total_membership: any = [];
  user_id: any[];
  //_total_membership: any= [];



  constructor(private sharedService: SharedServiceService, private logService: LogService, private spinner: NgxSpinnerService, private title: Title, private auth: AuthenticationService, private groupService: GroupService, private memberService: MemberService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle)

    //spinner show
    this.spinner.show()

    this.groupService.getGroup()
      .subscribe(data => {
      this.groups = data;
        console.log("This group array", this.groups)
        //get group membership

        for (let _group of this.groups) {
          // console.log("Group IDs", _groupArray.group_id)
          this.memberService.getMemberByGId(_group.group_id)
            .subscribe(m => {
              this.members = m;
              // const  count = this.members.map(x => x.group_id_fk).length
              //console.log("Group count", count)
              // this.groupsArray.forEach((p, index) => p._total_count = this.members.map(x => x.group_id_fk)[index])
              //console.log("New group  array", this.groupsArray)
            })
        }
        this.spinner.hide()

      });

      //get logged in user id 
      this.sharedService.sharedUser.subscribe(data=>{
        console.log("This user information form topnav", data)
        
      })
  }


  onSelect(group) {
    //this.router.navigate(['/branch', branch.branch_id]);
    this.router.navigate(['../mlist', group.group_id], { relativeTo: this.route });
  };

  onSelectEdit(group) {
    this.router.navigate(['../edit', group.group_id], { relativeTo: this.route });
  };


  removelistElement(group) {
    this.groupService.deleteGroups(group.group_id)
      .subscribe(g => {
        this.groups.splice(this.groups.indexOf(group), 1);
      }, (error) => {
        console.log(error);
      }
      );
    this.toastr.success('Group deleted successfully', 'CAPEP - KENYA');
    this.groupService.getGroup()
      .subscribe(groups => this.groups = groups);
  }


  //Number of members in a group
  getTotalGroups() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.group_id_fk = id;
      this.memberService.getMemberByGId(this.group_id)
        .subscribe(m => {
          this.members = m;
          this.total_members = this.members.length;
          console.log("Group total membership", this.members)

        })
    });

  }

}
