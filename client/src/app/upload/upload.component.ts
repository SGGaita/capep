import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

import {LogoutModalComponent} from '../sidenav/_modals/logout-modal/logout-modal.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit { 

  arrayA = [{sid:1, name:"Steve"},{sid:2, name:"Maureen"},{sid:3, name:"Damian"},{sid:4, name:"Dee"}]
  arrayB = [] 
  filterForm: FormGroup;

  imageText: string;
  fileData;

  message: string = "Records submitted successfully.";
  actionButtonLabel: string = "Close";
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide : number = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition ='top';
  fdMessage: string ="No data available";

  iname: string
  named: string;


  constructor(public matDialog: MatDialog,private snackBar: MatSnackBar, private http: HttpClient, private formBuilder: FormBuilder) { }

  fileProgress(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileData = file
    }
  }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      Iname: [0]})      
      
  }

  onSubmit() {
    let config = new MatSnackBarConfig()
    const formData = new FormData();
    formData.append('image', this.fileData);
    this.http.post<any>('/api/upload/', formData)
      .subscribe(res => {
        console.log(res);
        //notification
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.setAutoHide ?
        this.autoHide : 0;
        this.snackBar.open(this.message, this.action ? this.actionButtonLabel: undefined, config);
        
      },
        error => console.log(error))
  }

  submit(){
    let _id = this.filterForm.value.Iname
    console.log("Input number", _id)   

    this.arrayB = this.arrayA.filter((item)=>{
      if(item.sid == _id)
        return item;
      else 
      this.fdMessage ="No records found"
        return null;
  })
  //return this.arrayB
  //console.log(this.arrayB);
  let input_number = {new_id: +_id};
  console.log("New object", input_number)
  
  }


  openmodal() {
    this.named = "steve"
    //const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    //dialogConfig.disableClose = true;
    //dialogConfig.id = "logout-modal-component";
   // dialogConfig.height = "350px";
   // dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(LogoutModalComponent, {height: "350px",width: "600px",disableClose: true,id: "logout-modal-component", data: {name: this.named}});
  }

}
