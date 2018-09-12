import { Component, OnInit, Inject } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { HttpRequestServiceService } from '../../services/http-request-service.service';
export interface AddFarmerDialogData {
  milkType: string;
  villageName: string;
  farmerNo: string;
}

@Component({
  selector: 'app-add-farmer',
  templateUrl: './add.farmer.component.html',
  styleUrls: ['./add.farmer.component.css']
})
export class AddFarmerComponent{
  addFarmerInfo: any = {};
  villageInfo: AddFarmerDialogData;
  HttpRequestService: HttpRequestServiceService;
  constructor(private HttpRequestServiceService: HttpRequestServiceService,
    public dialogRef: MatDialogRef<AddFarmerComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: AddFarmerDialogData  ) {
    this.HttpRequestService = HttpRequestServiceService;
    this.villageInfo = data;
  }

  onSubmit() {
    this.addFarmerInfo.farmerNo = this.villageInfo.farmerNo;
    this.HttpRequestService.addFarmer(this.addFarmerInfo, this.villageInfo)
      .subscribe(data => {
        if (data['responseCode'] == 200) {
          this.dialogRef.close(data);
          this.openSnackBar(data['responseMessage'], "SUCCESS");
        }else{
          this.openSnackBar(data['responseMessage'], "ERROR");
        }
      }, error => {
        console.log(error);
      });
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

export interface FarmerInfoModel{
  farmerName: string;
  gender: string;
  address: string;
  fMobileNo: string;
}