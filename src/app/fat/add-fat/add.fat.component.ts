import { Component, OnInit, Inject } from "@angular/core";
import { HttpRequestServiceService } from "../../services/http-request-service.service";
import { AddFarmerComponent } from "../../farmers/add-farmer/add.farmer.component";
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { FatDialogData, FatRowData } from "../../Models/fat";

@Component({
  selector: "app-add.fat",
  templateUrl: "./add.fat.component.html",
  styleUrls: ["./add.fat.component.css"]
})
export class AddFatComponent implements OnInit {
  fatDialogData: FatDialogData;
  fatFormData: FatRowData;
  HttpRequestService: HttpRequestServiceService;
  dialogMode: string = "ADD";
  dialogTitle: string = "Add Farmer";
  dialogBtnText = "Add";
  fatTypes = ["A", "B", "C"];

  constructor(
    private HttpRequestServiceService: HttpRequestServiceService,
    public dialogRef: MatDialogRef<AddFatComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: FatDialogData
  ) {
    this.fatDialogData = data;
    this.HttpRequestService = HttpRequestServiceService;

    if (this.fatDialogData.dialogMode === "EDIT") {
      this.dialogMode = "EDIT";
      this.dialogTitle = "Edit Fat";
      this.dialogBtnText = "Edit";
    } else {
      this.dialogMode = "ADD";
      this.dialogTitle = "Add Fat";
      this.dialogBtnText = "Add";
      this.fatDialogData.fatData = {
        fat: "",
        fat_rate: ""
      };
    }
  }

  ngOnInit() {}

  onSubmit() {
    this.HttpRequestService.addOrUpdateFat(this.fatDialogData).subscribe(
      data => {
        if (data["responseCode"] == 200) {
          this.dialogRef.close(data);
          this.openSnackBar(data["responseMessage"], "SUCCESS");
          this.resetFormData();
        } else {
          this.openSnackBar(data["responseMessage"], "ERROR");
        }
      },
      error => {
        this.openSnackBar(error, "ERROR");
      }
    );
  }

  resetFormData() {
    this.fatDialogData.fatData = {
      fat: "",
      fat_rate: ""
    };
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
