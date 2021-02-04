import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

//import services
import { StaffService } from '../_services/staff.service';

//import models
import { Staff } from '../_models/staff';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-staffcreate',
  templateUrl: './staffcreate.component.html',
  styleUrls: ['./staffcreate.component.css'],
  providers: [StaffService]
})
export class StaffcreateComponent implements OnInit {
  staffForm: FormGroup;

  selectedStaff: ImageSnippet;
  selectedID: ImageSnippet;
  imagePreview: string;

  staff: Staff;
  staffs: Staff[] = [];

  public errorMsg;
  submitted = false;
  successMsg: string;

  constructor(private staffService: StaffService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.staffForm = this.formBuilder.group({
      staff_name: [null, Validators.required],
      staff_id_number: [null, Validators.required],
      staff_email: [null],
      staff_phone_number: [null],
      staff_gender: [null],
      staff_image: [null],
      staff_id_image: [null]
    });
  }

  get f() {
    return this.staffForm.controls;
  }


  //Submit
  save() {
    console.log(this.staffForm.value);
    this.submitted = true;
    if (this.staffForm.invalid) {
      return;
    }
    var newStaff = {
      staff_name: this.staffForm.value.staff_name,
      staff_id_number: this.staffForm.value.staff_id_number,
      staff_email: this.staffForm.value.staff_email,
      staff_phone_number: this.staffForm.value.staff_phone_number,
      staff_gender: this.staffForm.value.staff_gender,
      staff_image: this.staffForm.value.staff_image,
      staff_id_image: this.staffForm.value.staff_id_image
      //user_id_fk:
    };
    this.staffService.getStaff()
      .subscribe(data => {
        if (data.some(staff => {
          return (staff.staff_id_number === this.staffForm.value.staff_id_number && staff.staff_name === this.staffForm.value.staff_name);
        })) {
          this.errorMsg = "Records already exists";
        }
        else {
          this.staffService.addStaff(newStaff)
            .subscribe(staff => {
              console.log('this', staff);
              this.staffs.push(staff);
              this.successMsg = "New staff information successfully submitted";
              //reset form after submit
              this.staffForm.reset();
              this.errorMsg = null;
              for (var i in this.staffForm.controls) {
                this.staffForm.controls[i].setErrors(null);
              }
            },
              //display a failure error
              error => this.errorMsg = error);
        }
      });
  };

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


  reset() {
    this.staffForm.reset();
    for (var i in this.staffForm.controls) {
      this.staffForm.controls[i].setErrors(null);
    }
  };
}
