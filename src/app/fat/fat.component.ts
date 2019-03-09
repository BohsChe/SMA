import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource, MatDialog } from "@angular/material";
import { HttpRequestServiceService } from "../services/http-request-service.service";
import { FatDialogData, FatRowData } from "../Models/fat";
import { AddFatComponent } from "./add-fat/add.fat.component";
import { DeleteFatComponent } from "./delete-fat/delete.fat.component";

@Component({
  selector: "app-fat",
  templateUrl: "./fat.component.html",
  styleUrls: ["./fat.component.css"]
})
export class FatComponent implements OnInit {
  // Data table columns init
  displayedColumns = ["Fat", "Fat rate", "fats_edit", "fats_delete"];
  fatTypes = ["A", "B", "C"];

  FatTabledataSource = new MatTableDataSource();
  fatFilterType = "C";
  // to init pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // filter on datatables
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTablethis.FatTabledataSource defaults to lowercase matches
    this.FatTabledataSource.filter = filterValue;
  }
  // Fat Count
  FatsCount: number = 0;

  // to handle ajax calls
  httpRequestService: HttpRequestServiceService;
  constructor(
    httpRequestService: HttpRequestServiceService,
    public dialog: MatDialog
  ) {
    this.FatTabledataSource.paginator = this.paginator;
    this.httpRequestService = httpRequestService;
  }

  ngOnInit() {
    this.getFatList();
  }

  getFatList() {
    let filter = { fatType: this.fatFilterType };
    this.httpRequestService.getFatsList(filter).subscribe(
      data => {
        if (data["responseCode"] == 200) {
          this.FatTabledataSource = new MatTableDataSource(data["data"]);
          this.FatTabledataSource.paginator = this.paginator;
          this.FatsCount = data["data"].length;
        } else {
          this.FatTabledataSource = new MatTableDataSource();
          this.FatsCount = 0;
        }
      },
      error => {
        console.error(JSON.stringify(error));
      }
    );
  }

  openFatDialog(fatData: FatRowData, dialogMode: string) {
    let data: FatDialogData = {
      fatData,
      fatType: this.fatFilterType,
      dialogMode
    };
    const dialogRef = this.dialog.open(AddFatComponent, {
      width: "300px",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFatList();
    });
  }

  openDeleteFatDialog(fatData: FatRowData) {
    let data: FatDialogData = {
      fatData,
      fatType: this.fatFilterType,
      dialogMode: "delete"
    };
    const dialogRef = this.dialog.open(DeleteFatComponent, {
      width: "300px",
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFatList();
    });
  }
}
