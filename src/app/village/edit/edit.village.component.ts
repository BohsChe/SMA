import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { HttpRequestServiceService } from '../../services/http-request-service.service';
export interface EditVillageDialogData {
  villageName: string;
  oldVillageName: string;
}
@Component({
  selector: 'app-edit.village',
  templateUrl: './edit.village.component.html',
  styleUrls: ['./edit.village.component.css']
})
export class EditVillageComponent {

  editVillageInfo: any = {
    newVillageName: '',
  }
  httpRequestServiceService: HttpRequestServiceService;
  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(12),
    Validators.pattern('[0-9]+')  // validates input is digit
  ]);
  constructor(
    public dialogRef: MatDialogRef<EditVillageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditVillageDialogData,
    HttpRequestServiceService: HttpRequestServiceService,
    public snackBar: MatSnackBar) {
    this.httpRequestServiceService = HttpRequestServiceService;
    this.editVillageInfo.oldVillageName = data.oldVillageName;
    this.editVillageInfo.newVillageName = data.oldVillageName;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEditVillageSubmit(): void {
    this.httpRequestServiceService.updateVillageInfo(this.editVillageInfo)
      .subscribe(data => {
        if (data['responseCode'] == 200) {
          this.dialogRef.close(data);
          this.openSnackBar(data['responseMessage'], "SUCCESS");
        } else {
          this.openSnackBar(data['responseMessage'], "ERROR");
        }
      })
  }

  openSnackBar(message: string, action: string, ) {
    this.snackBar.open(message, action, {
      announcementMessage: "announce",
      data: "data",
      direction: "ltr",
      duration: 2000
    })
  }

}
