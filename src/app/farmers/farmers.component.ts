import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSelect } from '@angular/material';
import { MatDialog } from '@angular/material';

import { HttpRequestServiceService } from '../services/http-request-service.service';

import { AddFarmerComponent,FarmerInfoModel } from './add-farmer/add.farmer.component';
@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.component.html',
  styleUrls: ['./farmers.component.css']
})
export class FarmersComponent implements OnInit {
  // Data table columns init
  displayedColumns = ['farmer_name', 'gender', 'address', 'mobile_no', 'milk_type', 'farmer_edit', 'farmer_delete'];
  FarmerTabledataSource = new MatTableDataSource();

  httpRequestService: HttpRequestServiceService;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  milkTypes: string[] = ['A', 'B', 'C'];
  EditFarmerInfoModel: FarmerInfoModel;
  farmerListQuery: any = {
    milkType: 'C',
    villageName: ''
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTablethis.FarmerTabledataSource defaults to lowercase matches
    this.FarmerTabledataSource.filter = filterValue;
  }
  
  constructor(
    httpRequestService: HttpRequestServiceService,
    public dialog: MatDialog,
    private route: ActivatedRoute
   ){
    this.FarmerTabledataSource.paginator = this.paginator;
    this.httpRequestService = httpRequestService;
    this.farmerListQuery.villageName = this.route.snapshot.queryParamMap.get('villageName');
    this.farmerListQuery.villageId = this.route.snapshot.queryParamMap.get('villageId');
  }

  ngOnInit() {
    this.getFarmerList();
  }

  getFarmerList() {
    this.httpRequestService.getFarmersByVillageName(this.farmerListQuery)
      .subscribe(data => {
        if (data['responseCode'] == 200) {
          this.FarmerTabledataSource = new MatTableDataSource(data['data']);
          this.farmerListQuery.farmerNo = data['data'].length+1;
        }else{
          this.farmerListQuery.farmerNo = 1;
        }
      }, error => {
        console.error(JSON.stringify(error));
      });
  }

  openAddFarmerDialog() {
    const dialogRef = this.dialog.open(AddFarmerComponent, {
      width: '300px',
      data: this.farmerListQuery
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFarmerList();
    });
  }

  openEditFarmerDialog() {
    const dialogRef = this.dialog.open(AddFarmerComponent, {
      width: '300px',
      data: this.farmerListQuery
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFarmerList();
    });
  }

  openDeleteFarmerDialog() {
    const dialogRef = this.dialog.open(AddFarmerComponent, {
      width: '300px',
      data: this.farmerListQuery
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFarmerList();
    });
  }

}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}