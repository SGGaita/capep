import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

//Import service
import { UserService } from '../_services/user.service';
//import model
import { User } from '../_models/user';
import { ToastrService } from 'ngx-toastr';

declare var M: any;

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {


  user: User;
  users: User[];
  name: string;
  email: string;
  phone_number: string;
  gender: string;
  avatar: string;
  roles: string;
  created_at: Date;
  update_at: Date;

  p: number = 1;
  collection: any[] = this.users;

  public selectedId;

  //Popover dialogue
  public popoverTitle: string = "Record Delete Confirmation";
  public popoverMessage: string = "Do you really want to delete?";
  public cancelClicked: boolean = false;
  errorMsg: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => this.users = users);

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.selectedId = id;
    });
  }

  onSelectEdit(user) {
    this.router.navigate(['../edit', user.user_id], { relativeTo: this.route });
  }

  isSelected(user) {
    return user.user_id === this.selectedId;
  }

  //delete account
  removelistElement(user) {
    this.userService.deleteUser(user.user_id)
      .subscribe(g => {
        this.users.splice(this.users.indexOf(user), 1);

        this.toastr.success('Account deleted successfully', 'CAPEP - KENYA');
        this.userService.getUsers()
          .subscribe(data => this.users = data)
      }, (error) => {
        this.errorMsg = error
      }
      );
  }


}
