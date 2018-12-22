import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSnackBar } from "@angular/material";

import { HttpRequestServiceService } from "../../services/http-request-service.service";
import {
  AddFarmerFormData,
  AddFarmerDialogData,
  FarmerTableRowData,
  UpdateFarmerApiData
} from "./../../Models/farmer";

@Component({
  selector: "app-add-farmer",
  templateUrl: "./add.farmer.component.html",
  styleUrls: ["./add.farmer.component.css"]
})
export class AddFarmerComponent {
  milkTypes: string[] = ["A", "B", "C"];
  dialogMode: string = "ADD";
  dialogTitle: string = "Add Farmer";
  dialogBtnText = "Add";

  farmerDialogData: AddFarmerDialogData;
  HttpRequestService: HttpRequestServiceService;

  constructor(
    private HttpRequestServiceService: HttpRequestServiceService,
    public dialogRef: MatDialogRef<AddFarmerComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: AddFarmerDialogData
  ) {
    this.HttpRequestService = HttpRequestServiceService;
    this.farmerDialogData = data;
    debugger;
    if (this.farmerDialogData.type !== "add") {
      this.dialogMode = "EDIT";
      this.dialogTitle = "Edit Farmer";
      this.dialogBtnText = "Edit";
    } else {
      this.dialogMode = "ADD";
      this.dialogTitle = "Add Farmer";
      this.dialogBtnText = "Add";
      this.farmerDialogData.farmerFormData = {
        address: "",
        farmerName: "",
        fMobileNo: "",
        gender: "",
        milkType: "",
        farmerNo: ""
      };
    }
  }

  onSubmit() {
    if (this.dialogMode == "EDIT") {
      let updateFarmerApiData: UpdateFarmerApiData = {
        farmerNo: this.farmerDialogData.farmerNo,
        mobileNo: "",
        newAddress: this.farmerDialogData.farmerFormData.address,
        newFarmerName: this.farmerDialogData.farmerFormData.farmerName,
        newGender: this.farmerDialogData.farmerFormData.gender,
        newMilkType: this.farmerDialogData.farmerFormData.milkType,
        newMobileNo: this.farmerDialogData.farmerFormData.fMobileNo,
        newVillageName: this.farmerDialogData.villageName
      };
      this.editFarmer(updateFarmerApiData);
    } else {
      this.addFarmer();
    }
  }

  addFarmer() {
    this.HttpRequestService.addFarmer(this.farmerDialogData).subscribe(
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
        console.log(error);
      }
    );
  }
  resetFormData() {
    this.farmerDialogData.farmerFormData = {
      address: "",
      farmerName: "",
      fMobileNo: "",
      gender: "M",
      milkType: "",
      farmerNo: ""
    };
  }

  editFarmer(editFarmerData: UpdateFarmerApiData) {
    this.HttpRequestService.updateFarmerInfo(editFarmerData).subscribe(
      data => {
        if (data["responseCode"] == 201) {
          this.dialogRef.close(data);
          this.resetFormData();
          this.openSnackBar(data["statusMessage"], "SUCCESS");
        } else {
          this.openSnackBar(data["statusMessage"], "ERROR");
        }
      },
      error => {
        console.log(error);
      }
    );
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
