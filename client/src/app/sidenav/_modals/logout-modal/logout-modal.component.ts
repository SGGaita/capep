import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService} from '../../../auth/authentication.service';
import { LogService } from 'src/app/_services/shared_service/log.service';
import { SharedServiceService } from 'src/app/_services/shared_service/shared-service.service';


@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css']
})
export class LogoutModalComponent implements OnInit {

  constructor(private sharedService: SharedServiceService, private logService: LogService, private auth: AuthenticationService,public dialogRef: MatDialogRef<LogoutModalComponent>) { }

  ngOnInit() {
  }

  actionFunction() {

   //get logged in user id 
   this.sharedService.sharedUser.subscribe(data=>{
    console.log("This user information from topnav", data)
    
  })
    
    //this.auth.logout();
    //this.dialogRef.close();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

}
