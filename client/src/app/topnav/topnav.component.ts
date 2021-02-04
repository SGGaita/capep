import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthenticationService } from "../auth/authentication.service";
import { LogoutModalComponent } from "../sidenav/_modals/logout-modal/logout-modal.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UserService } from "../_services/user.service";
import { SharedServiceService } from "../_services/shared_service/shared-service.service";
import { LogService } from "../_services/shared_service/log.service";

@Component({
  selector: "app-topnav",
  templateUrl: "./topnav.component.html",
  styleUrls: ["./topnav.component.css"],
})
export class TopnavComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  userName: string;
  user: any;
  BranchID: number;
  user_id: any;

  constructor(
    private auth: AuthenticationService,
    private logService: LogService,
    private sharedService: SharedServiceService,
    private userService: UserService,
    public matDialog: MatDialog
  ) {}

  ngOnInit() {
    //get user details
    let _user_id = +this.auth.getUserDetails().user_id;
    //console.log("From the navbar",_user_id)
    this.userService.getUserById(_user_id).subscribe((data) => {
      console.log("User details", data);
      this.user = data;
      this.userName = this.user.map((a) => a.userName);
      this.BranchID = +this.user.map((a) => a.branch_id_fk);

      //pass userID value to send user id
      this.sendUserID(this.user);

    });
  }

  //Toggle side
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  //send user id

  sendUserID(user: []) {
    this.sharedService.nextUserID(user);
  }

  openmodal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "logout-modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(LogoutModalComponent, dialogConfig);
  }
}
