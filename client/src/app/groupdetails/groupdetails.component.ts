import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';


import { Group } from '../_models/group';
import { GroupService } from '../_services/group.service';
import { Member } from '../_models/member';
import { MemberService } from '../_services/member.service';

@Component({
  selector: 'app-groupdetails',
  templateUrl: './groupdetails.component.html',
  styleUrls: ['./groupdetails.component.css']
})
export class GroupdetailsComponent implements OnInit {

  group: Group;
  groups: Group[];
  group_id: number;
  group_name: string;
  group_code: string;
  group_created_at: Date;
  branch_name: string;
  branch_code: string;

  total_members: number;


  member: Member;
  members: Member[];
  group_id_fk: number;




  constructor(private route: ActivatedRoute, private router: Router, private groupService: GroupService, private memberService: MemberService) { }

  ngOnInit() {

    this.loadGroup();

    this.getTotalGroups();

  }

  loadGroup() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));

      this.group_id = id
      console.log(this.group_id);

      this.groupService.getGroupById(this.group_id)
        .subscribe(m => {
          console.log(m);
          this.group = m
        });
    });

  }




  goPrevious() {
    let previousId = this.group_id - 1;
    this.router.navigate(['../', previousId], { relativeTo: this.route });
  }

  goNext() {
    let nextId = this.group_id + 1;
    this.router.navigate(['../', nextId], { relativeTo: this.route });
  }

  goBack() {
    let selectedId = this.group_id ? this.group_id : null;
    this.router.navigate(['../', { id: selectedId }], { relativeTo: this.route });
  }



  getTotalGroups() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));

      this.group_id_fk = id;
      this.memberService.getMemberByGId(this.group_id)
        .subscribe(m => {
          this.members = m;
          this.total_members = this.members.length;
          console.log(this.total_members);
          //get the last item from the array members
          var last = this.members[this.total_members - 1];
          console.log(last);
          //console.log(last.member_name)

        })
    });
  }


}
