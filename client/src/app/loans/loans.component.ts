import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MemberService } from '../_services/member.service';
import { Member } from '../_models/member';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  member: Member;
  members: Member[];
  selectedId: number;
  member_id: number;

  constructor(private memberService: MemberService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.memberService.getMembers()
    .subscribe( members => this.members = members);

    this.route.paramMap.subscribe((params: ParamMap) =>{
      let id = parseInt(params.get('id'));
      this.selectedId = id;
    });
  }


  onSelectLoans(member){
    this.router.navigate(['members/loan', member.member_id]);
  }

}
