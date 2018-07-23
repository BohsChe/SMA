import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import {HttpRequestServiceService} from '../services/http-request-service.service';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.css']
})
export class VillageComponent implements OnInit {
  httpRequestService: HttpRequestServiceService;
  villageList: any = new MatTableDataSource();
  villageMasterList: village[];
  displayedColumns = ['village_id', 'village_name', 'user_id'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(httpRequestService: HttpRequestServiceService) {
    this.httpRequestService = httpRequestService;
    this.villageList.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.villageList.filter = filterValue;
  }

  ngOnInit() {
    this.getVillagesList();
  }

  getVillagesList(){
    this.httpRequestService.getAllVillages()
    .subscribe(data => {
      if(data['responseCode'] == 200){
        this.villageMasterList = data['data'];
        this.villageList = new MatTableDataSource(this.villageMasterList);
      }
    }, error => {
      console.error(JSON.stringify(error));
    });
  }

  /**
   * add village to the list
   */
  addVillage(){
    this.httpRequestService.addVillage({
      mobileNo: '9941840511',
      villageName: 'jangampalle123'
    })
    .subscribe(data => {
      if(data['responseCode'] == 200){
        this.villageMasterList.push({
          village_id: '#',
          village_name: 'jangampalle123',
          user_id: 9
        });
        this.villageList = new MatTableDataSource(this.villageMasterList);
      }else if(data['responseCode'] == 200){
        alert(data['responseMessage']);
      }
    }, error => {
      console.error(JSON.stringify(error));
    });
  }

}

export interface village {
  village_id: string;
  user_id: number;
  village_name: string;
}