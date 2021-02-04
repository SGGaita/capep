import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

//import  services
import { AuthenticationService, TokenPayload } from '../auth/authentication.service';
import { error} from 'protractor';
import { LogService } from '../_services/shared_service/log.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public errorMsg;
  loading = false;
  public successMsg;
  public loadingMsg = "Authenticating...Please wait";

  credentials: TokenPayload ={
    //user_id: 0,
    staff_id_fk:0,
    userName: '',
    email: '',
    password:'',
    roles:''
  }

  loginForm: {};
  
  private formSubmitAttempt: boolean;
  user: any;

  today_date = new Date();
  _year: number;

  @Output() loginProfile: EventEmitter<any> = new EventEmitter()

  constructor(private router: Router, private logService: LogService, private fb: FormBuilder, private auth: AuthenticationService, private title: Title) { }

  login () {
    this.loading = true;
    this.errorMsg = ""
    this.auth.login(this.credentials).subscribe(
      data => {
        this.user = data ;
        //console.log(this.user)
        //console.log("Login credentials username", this.credentials)
        //this.loginProfile.emit(this.credentials.userName);
        let _user_id = +this.auth.getUserDetails().user_id;
        

        const newLog = {
          user_id_fk: _user_id,
        };
        this.logService.addLog(newLog).subscribe((data) => {
          console.log("This log", data);
        });
        
        this.successMsg = "Successful Authentication";
        this.router.navigateByUrl('/dashboard')
      },
      err => {this.errorMsg = err.error.reason;
        this.loading = false;
        console.log("This is error", err  )
      }
    )
    
    
  }

  ngOnInit() {
    this._year = this.today_date.getFullYear()
  }

  
   
    
}
