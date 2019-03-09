import { Component, OnInit, Inject } from "@angular/core";
import { HttpRequestServiceService } from "../../services/http-request-service.service";
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FatRowData, FatDialogData } from "../../Models/fat";

@Component({
  selector: "app-delete.fat",
  templateUrl: "./delete.fat.component.html",
  styleUrls: ["./delete.fat.component.css"]
})
export class DeleteFatComponent implements OnInit {
  fatFormData: FatDialogData;
  HttpRequestService: HttpRequestServiceService;

  constructor(
    private HttpRequestServiceService: HttpRequestServiceService,
    public dialogRef: MatDialogRef<DeleteFatComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: FatDialogData
  ) {
    this.HttpRequestService = HttpRequestServiceService;
    this.fatFormData = data;
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteFatSubmit() {
    this.HttpRequestService.deleteFat(this.fatFormData).subscribe(data => {
      if (data["responseCode"] == 200) {
        this.dialogRef.close(data);
        this.openSnackBar(data["responseMessage"], "SUCCESS");
      } else {
        this.openSnackBar(data["responseMessage"], "ERROR");
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      announcementMessage: "announce",
      data: "data",
      direction: "ltr",
      duration: 2000
    });
  }
}
