import { Component, OnInit } from '@angular/core';
import { Staff } from '../_models/staff';
import { StaffService } from '../_services/staff.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-staffupdate',
  templateUrl: './staffupdate.component.html',
  styleUrls: ['./staffupdate.component.css']
})
export class StaffupdateComponent implements OnInit {
  staffUpdateForm: FormGroup;

  selectedStaff: ImageSnippet;
  selectedID: ImageSnippet;
  imagePreview: string;

  staff: Staff;
  staffs: Staff[] = [];

  public errorMsg;
  submitted = false;
  successMsg: string;
  staff_id: number;
  staff_name: any;
  staff_id_number: any;
  staff_email: any;
  staff_phone_number: any;
  staff_gender: any;
  staff_image: any;
  staff_id_image: any;


  constructor(private staffService: StaffService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.staffUpdateForm = this.formBuilder.group({
      staff_name: [null, Validators.required],
      staff_id_number: [null, Validators.required],
      staff_email: [null],
      staff_phone_number: [null],
      staff_gender: [null],
      staff_image: [null],
      staff_id_image: [null]
    });

    //fetch branch by id 
    this.route.paramMap.subscribe((params: ParamMap)=> {
      let id = parseInt(params.get('id'));
      this.staffService.getStaffById(id)
          .subscribe(m=> {
          console.log("this content", m);
          this.staff_id = id;
          console.log("this content id", this.staff_id);
          this.staff = m;
          this.staff_name = this.staff.map(function (a) { return a['staff_name']; }); //extract the property branch_name from branch object and initialize to var branchName
          this.staff_id_number = this.staff.map(function (a) { return a['staff_id_number']; });
          this.staff_email = this.staff.map(function (a) { return a['staff_email']; });
          this.staff_phone_number = this.staff.map(function (a) { return a['staff_phone_number']; });
          this.staff_gender = this.staff.map(function (a) { return a['staff_gender']; });
          this.staff_image = this.staff.map(function (a) { return a['staff_image']; });
          this.staff_id_image = this.staff.map(function (a) { return a['staff_id_image']; });
          //Patch the form with the values of the selected ID
          this.staffUpdateForm.patchValue({
              staff_name: this.staff_name,
              staff_id_number: this.staff_id_number,
              staff_email: this.staff_email,
              staff_phone_number: this.staff_phone_number,
              staff_gender: this.staff_gender,
              staff_image: this.staff_image,
              staff_id_image: this.staff_id_image
          });
      });
  }); //end of fetch branch by id 
  }

  processImage(imageStaff: any) {
    const file: File = imageStaff.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.selectedStaff = new ImageSnippet(event.target.result, file);
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

  //Update 
 updateStaff() {    
    this.staffService.updateStaff(this.staff_id, this.staffUpdateForm.value)
        .subscribe(data =>{
        console.log(data);
        this.successMsg = "Staff information successfully updated";
    }, error=>this.errorMsg = error);
};


}
