import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { HttpRequestServiceService } from '../../services/http-request-service.service';

export interface deleteVillageDialogData {
  village_id: string;
  village_name: string;
  user_id: string;
}
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteVillageDialogComponent {
  // data members
  villageInfo: deleteVillageDialogData;
  httpRequestServiceService: HttpRequestServiceService;

  constructor(
    public dialogRef: MatDialogRef<DeleteVillageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: deleteVillageDialogData,
    HttpRequestServiceService: HttpRequestServiceService,
    public snackBar: MatSnackBar) {
    this.httpRequestServiceService = HttpRequestServiceService;
    this.villageInfo = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteVillageSubmit(): void {
    this.httpRequestServiceService.deleteVillageInfo(this.villageInfo)
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
