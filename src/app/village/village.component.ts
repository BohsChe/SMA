import { Component, OnInit } from '@angular/core';
import {HttpRequestServiceService} from '../services/http-request-service.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.css']
})
export class VillageComponent implements OnInit {
  httpRequestService: HttpRequestServiceService;
  villageList: any = new MatTableDataSource();

  constructor(httpRequestService: HttpRequestServiceService) {
    this.httpRequestService = httpRequestService;
  }

  ngOnInit() {
    this.getVillagesList();
  }

  getVillagesList(){
    this.httpRequestService.getAllVillages()
    .subscribe(data => {
      if(data['responseCode'] == 200){
        debugger;
        this.villageList = new MatTableDataSource(data['data']);
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