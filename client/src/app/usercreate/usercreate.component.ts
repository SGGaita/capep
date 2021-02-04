import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


import { UserService } from '../_services/user.service';
import {AuthenticationService,TokenPayload} from '../auth/authentication.service'


import {User} from '../_models/user';
import { StaffService } from '../_services/staff.service';
import { Staff } from '../_models/staff';

declare var M: any;

class ImageSnippet{
  constructor(public src: string, public file: File){

  }
}

@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.component.html',
  styleUrls: ['./usercreate.component.css'],
  providers: [ UserService ]
})
export class UsercreateComponent implements OnInit {
 
  credentials: TokenPayload ={
    //user_id: 0,
    staff_id_fk:0,
    userName: '',
    email: '',
    password:'',
    roles:''
  }
  
  user: User;
  users: User[] = [];
  name: string;
  email: string;
  password: string;
  accRoles: any = [];

  staff: Staff;
  staffs: Staff[] = [];
      
  userForm: FormGroup; 
  userRoles = [{id: '1' ,name: 'Administrator', alias:'ADMIN'}, {id: '2', name: 'Official', alias:'USER'}];  
  
  submitted = false;
  public errorMsg;
  public successMsg;
 

  constructor( private auth: AuthenticationService,private staffService: StaffService, private userService: UserService, private router: Router,private formBuilder: FormBuilder, private toastr: ToastrService, private http: HttpClient) {  
    
   } 

   
  ngOnInit() {

    this.userForm = this.formBuilder.group(
      { 
        staff_id_fk: [null],
        name: [null, Validators.required],
        email: [null, Validators.required],
        userName: [null, Validators.required],
        password: [null, Validators.required],
        confirmpassword: [null],
        roles: [null]
      });
      //Load staff names
      this.staffService.getStaff()
      .subscribe(s => this.staffs = s);
      //Load roles
       this.accRoles = this.userRoles;
  }

  get f() {
    return this.userForm.controls;
  }

  

  save(){
    this.credentials = {
      staff_id_fk: this.userForm.value.staff_id_fk,
      userName: this.userForm.value.userName,
      email:this.userForm.value.email,
      password:this.userForm.value.password,
      roles:this.userForm.value.roles,
    }
       
    this.auth.register(this.credentials).subscribe(()=> {
      this.successMsg="User successfully registered";
    }, (err) => {
      console.error(err);
    });
   
  }

  resetForm() {
    this.userForm.reset()
    for (let i in this.userForm.controls) {
      this.userForm.controls[i].setErrors(null);
    }
  }


 

}
