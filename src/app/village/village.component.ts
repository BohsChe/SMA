import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { HttpRequestServiceService } from '../services/http-request-service.service';

import { AddVillageDialogComponent } from './add/add.village.dialog.component';
import { EditVillageComponent } from './edit/edit.village.component';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.css']
})
export class VillageComponent implements OnInit {
  httpRequestService: HttpRequestServiceService;
  villageList: any = new MatTableDataSource();
  villageMasterList: village[];
  displayedColumns = ['village_id', 'village_name', 'user_id', 'action_edit', 'action_delete'];
  addVillageName: any;
  editVillageName: any;
  villageTotalCount: Number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(httpRequestService: HttpRequestServiceService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.httpRequestService = httpRequestService;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.villageList.filter = filterValue;
  }

  ngOnInit() {
    this.getVillagesList();
  }

  openAddVillageDialog() {
    const dialogRef = this.dialog.open(AddVillageDialogComponent, {
      width: '250px',
      data: { villageName: this.addVillageName }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getVillagesList();
    });
  }

  openEditVillageDialog(oldVillageName) {
    const dialogRef = this.dialog.open(EditVillageComponent, {
      width: '250px',
      data: { villageName: this.editVillageName, oldVillageName: oldVillageName }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data['responseCode'] == 200) {
        this.openSnackBar(data['responseMessage'], "SUCCESS");
        this.getVillagesList();
      } else {
        this.openSnackBar(data['responseMessage'], "ERROR");
      }
    });
  }

  getVillagesList() {
    this.httpRequestService.getAllVillages()
      .subscribe(data => {
        if (data['responseCode'] == 200) {
          this.villageMasterList = data['data'];
          this.villageTotalCount = data['data'].length;
          this.villageList = new MatTableDataSource(this.villageMasterList);
          this.villageList.paginator = this.paginator;
          this.villageList.sort = this.sort;
        }
      }, error => {
        console.error(JSON.stringify(error));
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

export interface village {
  village_id: string;
  user_id: number;
  village_name: string;
}