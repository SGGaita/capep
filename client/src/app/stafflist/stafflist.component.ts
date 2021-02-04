import { Component, OnInit } from '@angular/core';
import { StaffService } from '../_services/staff.service';
import { Staff } from '../_models/staff';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stafflist',
  templateUrl: './stafflist.component.html',
  styleUrls: ['./stafflist.component.css']
})
export class StafflistComponent implements OnInit {
  staff: Staff;
  staffs: Staff[] = [];

  //Popover dialogue
  public popoverTitle: string = "Record Delete Confirmation";
  public popoverMessage: string = "Do you really want to delete?";
  public cancelClicked: boolean = false;

  constructor(private staffService: StaffService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    //refresh list
    this.staffService.getStaff()
      .subscribe(staffs => this.staffs = staffs);
  }


  onSelectEdit(staff) {
   this.router.navigate(['admin/staff/edit', staff.staff_id]);    
  }

  removelistElement(staff) {
    this.staffService.deleteStaff(staff.staff_id)
      .subscribe(g => {
        this.staffs.splice(this.staffs.indexOf(staff), 1);
      }, (error) => {
        console.log(error);
      }
      );
    this.toastr.success('Group deleted successfully', 'CAPEP - KENYA');
    this.staffService.getStaff()
      .subscribe(staffs => this.staffs = staffs);
  }


}
