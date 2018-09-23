import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { HttpRequestServiceService } from '../../services/http-request-service.service';
import { AddFarmerFormData, AddFarmerDialogData, FarmerTableRowData, UpdateFarmerApiData} from './../../Models/farmer';

@Component({
  selector: 'app-delete-farmer',
  templateUrl: './delete-farmer.component.html',
  styleUrls: ['./delete-farmer.component.css']
})
export class DeleteFarmerComponent {
  HttpRequestService: HttpRequestServiceService;
  farmerInfo: FarmerTableRowData;;

  constructor(private HttpRequestServiceService: HttpRequestServiceService,
    public dialogRef: MatDialogRef<DeleteFarmerComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: FarmerTableRowData ) { 
    this.HttpRequestService = HttpRequestServiceService;
    this.farmerInfo = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteFarmerSubmit(): void {
    this.HttpRequestService.deleteFarmerInfo(this.farmerInfo)
      .subscribe(data => {
        if (data['status'] == 200) {
          this.dialogRef.close(data);
          this.openSnackBar(data['statusMessage'], "SUCCESS");
        }else{
          this.openSnackBar(data['statusMessage'], "ERROR");
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
