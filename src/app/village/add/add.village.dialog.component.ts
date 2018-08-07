import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { HttpRequestServiceService } from '../../services/http-request-service.service';
export interface AddVillageDialogData {
    villageName: string;
}

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'add.village.dialog.html',
})
export class AddVillageDialogComponent {
    addVillageInfo: any = {
        villageName: ''
    }
    httpRequestServiceService: HttpRequestServiceService;
    phoneFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12),
        Validators.pattern('[0-9]+')  // validates input is digit
    ]);
    constructor(
        public dialogRef: MatDialogRef<AddVillageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AddVillageDialogData,
        HttpRequestServiceService: HttpRequestServiceService,
        public snackBar: MatSnackBar) {
        this.httpRequestServiceService = HttpRequestServiceService;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        this.httpRequestServiceService.addVillage(this.addVillageInfo)
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