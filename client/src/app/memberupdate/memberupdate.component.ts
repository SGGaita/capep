import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

//import services
import { MemberService } from '../_services/member.service';
import { BranchService } from '../_services/branch.service';
import { GroupService } from '../_services/group.service';

//import models
import { Member } from '../_models/member';
import { Group } from '../_models/group';
import { Branch } from "../_models/Branch.1";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-memberupdate',
  templateUrl: './memberupdate.component.html',
  styleUrls: ['./memberupdate.component.css']
})
export class MemberupdateComponent implements OnInit {
  memberUpdateForm: FormGroup;

  selectedPassport: ImageSnippet;
  selectedID: ImageSnippet;
  selectedSignature: ImageSnippet;
  imagePreview: string;

  //MEMBERS
  member: Member;
  members: Member[] = [];
  member_id: number;
  group_id_fk: string;
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

  //GROUPS   
  group: Group;
  groups: Group[] = [];
  group_id: number;
  group_name: string;
  group_code: string;
  group_created_at: Date;
  branch_id_fk: string;

  //BRANCHES   
  branch: Branch;
  branchs: Branch[];
  branch_name: string;
  branch_code: string;

  constructor(private branchService: BranchService, private groupService: GroupService, private memberService: MemberService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.memberUpdateForm = new FormGroup(
      {
        branch_id_fk: new FormControl(null),
        group_id_fk: new FormControl(null),
        member_name: new FormControl(null),
        member_id_no: new FormControl(null),
        membership_no: new FormControl(null),
        occupation: new FormControl(null),
        phone_number: new FormControl(null),
        postal_address: new FormControl(null),
        postal_code: new FormControl(null),
        location: new FormControl(null),
        town: new FormControl(null),
        passport_image: new FormControl(null),
        id_image: new FormControl(null),
        signature_image: new FormControl(null),
        next_kin_name: new FormControl(null),
        next_kin_relation: new FormControl(null),
        next_id_number: new FormControl(null),
        next_phone_number: new FormControl(null),
        next_location: new FormControl(null),
        next_town: new FormControl(null),

      });

    //branch list
    this.branchService.getBranch()
      .subscribe(branchs => this.branchs = branchs);

    //fetch member by id 
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.memberService.getMemberById(id)
        .subscribe(m => {
          this.member_id = id;
          this.member = m;
          this.branch_id_fk = this.member.map(function (a) { return a['branch_id_fk']; });//extract the property branch_name from branch object and initialize to var branchName
          this.group_id_fk = this.member.map(function (a) { return a['group_id_fk']; });
          this.member_name = this.member.map(function (a) { return a['member_name']; });
          this.member_id_no = this.member.map(function (a) { return a['member_id_no']; });
          this.membership_no = this.member.map(function (a) { return a['membership_no']; });
          this.occupation = this.member.map(function (a) { return a['occupation']; });
          this.phone_number = this.member.map(function (a) { return a['phone_number']; });
          this.postal_address = this.member.map(function (a) { return a['postal_address']; });
          this.postal_code = this.member.map(function (a) { return a['postal_code']; });
          this.location = this.member.map(function (a) { return a['location']; });
          this.town = this.member.map(function (a) { return a['town']; });
          this.next_kin_name = this.member.map(function (a) { return a['next_kin_name']; });
          this.next_kin_relation = this.member.map(function (a) { return a['next_kin_relation']; });
          this.next_id_number = this.member.map(function (a) { return a['next_id_number']; });
          this.next_phone_number = this.member.map(function (a) { return a['next_phone_number']; });
          this.next_location = this.member.map(function (a) { return a['next_location']; });
          this.next_town = this.member.map(function (a) { return a['next_town']; });

          //Patch the form with the values of the selected ID
          this.memberUpdateForm.patchValue({
            branch_id_fk: this.branch_id_fk,
            group_id_fk: this.group_id_fk,
            member_name: this.member_name,
            member_id_no: this.member_id_no,
            membership_no: this.membership_no,
            occupation: this.occupation,
            phone_number: this.phone_number,
            postal_address: this.postal_address,
            postal_code: this.postal_code,
            location: this.location,
            town: this.town,
            passport_image: this.passport_image,
            id_image: this.id_image,
            signature_image: this.signature_image,
            next_kin_name: this.next_kin_name,
            next_kin_relation: this.next_kin_relation,
            next_id_number: this.next_id_number,
            next_phone_number: this.next_phone_number,
            next_location: this.next_location,
            next_town: this.next_town,
          });
        });
    });//end of fetch branch by id 


  }// End ngOnInit


  //populate group
  onChangeBranch(branch_id_fk: number) {

    this.groupService.getGroups(branch_id_fk)
      .subscribe(groups => this.groups = groups)
  }



  processPassport(imagePassport: any) {
    const file: File = imagePassport.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.selectedPassport = new ImageSnippet(event.target.result, file);
    })
    reader.readAsDataURL(file);
  }


  processIdCard(imageID: any) {
    const file: File = imageID.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.selectedID = new ImageSnippet(event.target.result, file);
    })
    reader.readAsDataURL(file);
  }

  processSignature(imageSignature: any) {
    const file: File = imageSignature.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.selectedSignature = new ImageSnippet(event.target.result, file);
    })
    reader.readAsDataURL(file);
  }

  updateMember(memberUpdateForm) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.memberService.updateMember(id, this.memberUpdateForm.value)
        .subscribe(result =>
          console.log(result))
    })

  }
}

