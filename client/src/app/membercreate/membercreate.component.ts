import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

//import services
import { MemberService } from '../_services/member.service';
import { BranchService } from '../_services/branch.service';
import { GroupService } from '../_services/group.service';

//import models
import { Member } from '../_models/member';
import { Group } from '../_models/group';
import { Branch } from "../_models/Branch.1";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


class ImageSnippet {
  constructor(public src: string, public file: File) { }
} 

@Component({
  selector: 'app-membercreate',
  templateUrl: './membercreate.component.html',
  styleUrls: ['./membercreate.component.css']
})
export class MembercreateComponent implements OnInit {
  pageTitle = "CAPEP KENYA : Member Account Creation "
  memberForm: FormGroup;

  selectedPassport: ImageSnippet;
  selectedID: ImageSnippet;
  selectedSignature: ImageSnippet;
  imagePreview: string;


  //MEMBERS
  member: Member;
  members: Member[] = [];
  member_id: number;
  group_id_fk: number;
  member_name: string;
  member_id_no: string;
  membership_no: string;
  occupation: string;
  phone_number: string;
  postal_address: string;
  postal_code: string;
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
  branch_id_fk: number;

  //BRANCHES   
  branch: Branch;
  branchs: Branch[];
  branch_name: string;
  branch_code: string;

  public submitted = false
  errorMsg: string;
  successMsg: string;
  fileData: File;



  constructor(private http: HttpClient, private location: Location, private router: Router, private title: Title, private branchService: BranchService, private groupService: GroupService, private memberService: MemberService) { }

  //add new member
  addMember() {
    console.log(this.memberForm.value);
    this.submitted = true;
    if (this.memberForm.invalid) {
      return;
    }
    const newMember = {
      group_id_fk: this.memberForm.value.group_id_fk,
      member_name: this.memberForm.value.member_name,
      member_id_no: this.memberForm.value.member_id_no,
      membership_no: this.memberForm.value.membership_no,
      occupation: this.memberForm.value.occupation,
      phone_number: this.memberForm.value.phone_number,
      postal_address: this.memberForm.value.postal_address,
      postal_code: this.memberForm.value.postal_code,
      location: this.memberForm.value.location,
      town: this.memberForm.value.town,
      passport_image: this.memberForm.value.passport_image,
      id_image: this.memberForm.value.id_image,
      signature_image: this.memberForm.value.signature_image,
      next_kin_name: this.memberForm.value.next_kin_name,
      next_kin_relation: this.memberForm.value.next_kin_relation,
      next_id_number: this.memberForm.value.next_id_number,
      next_phone_number: this.memberForm.value.next_phone_number,
      next_location: this.memberForm.value.next_location,
      next_town: this.memberForm.value.next_town,

    }
    this.memberService.getMemberGId(this.memberForm.value.group_id_fk)
      .subscribe(members => {
        console.log("Group Members are", members);
        if (members.some(member => { return member.membership_no == this.memberForm.value.membership_no; })) {
          this.errorMsg = "The Membership number is already in use in the selected group. Verify your entries";
        }
        else {
          if (members.some(member => { return member.group_id_fk == this.memberForm.value.group_id_fk; })
            &&
            members.some(member => {
              return member.member_id_no === this.memberForm.value.member_id_no;
            })) {
            this.errorMsg = "Similar ID record already exist in the selected group. Verify your entries";
          }
          else {
            this.memberService.addMember(newMember)
              .subscribe(member => {
                console.log("submitted info", member);
                this.members.push(member);
                this.successMsg = "Member successfully submitted";
                //reset form after submit
                this.memberForm.reset();
                this.errorMsg = null;
                for (var i in this.memberForm.controls) {
                  this.memberForm.controls[i].setErrors(null);
                }
              },
                //display a failure error
                error => this.errorMsg = error);
          }
        }
      });
  }


  ngOnInit() {
    this.title.setTitle(this.pageTitle)

    //construct form
    this.memberForm = new FormGroup(
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

  }

  get f() {
    return this.memberForm.controls;
  }

  onChangeBranch(branch_id_fk: number) {

    this.groupService.getGroups(branch_id_fk)
      .subscribe(groups => this.groups = groups)
  }


  processPassport(imagePassport: any) {
    const file: File = imagePassport.files[0];
    this.fileData = file
    var fileExtension = '.' + file.name.split('.').pop();
    console.log("this passport image", this.fileData)
    console.log("Date now", Date.now())
    console.log("this passport image extension", fileExtension)
    console.log("member" + '-' + Date.now() + '.' + fileExtension)
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.selectedPassport = new ImageSnippet(event.target.result, file);
    })
    reader.readAsDataURL(file);

    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const formData = new FormData();
    formData.append('image', this.fileData);
    formData.append('field_value', this.memberForm.value)
    this.http.post<any>('/api/upload_member/', formData, { headers: headers })
      .subscribe(res => {
        console.log("From server", res)
      })
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



  goGrouplist() {
    this.router.navigate(['group/mgroups']);
  };


  goBack() {
    this.location.back()
  }




}

