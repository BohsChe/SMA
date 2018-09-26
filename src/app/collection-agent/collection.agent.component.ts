import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
// custom services
import { HttpRequestServiceService } from '../services/http-request-service.service';
// import Models
import { AgentRowData, AgentDialogData } from "../Models/agent";
// components for dialog
import { AddAgentComponent } from './add-agent/add-agent.component';

@Component({
  selector: 'app-collection.agent',
  templateUrl: './collection.agent.component.html',
  styleUrls: ['./collection.agent.component.css']
})
export class CollectionAgentComponent implements OnInit {
  // Data table columns init
  displayedColumns = ['agent_id', 'name', 'password', 'agents_edit', 'agents_delete'];
  AgentTabledataSource = new MatTableDataSource();
  // to init pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // filter on datatables
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTablethis.AgentTabledataSource defaults to lowercase matches
    this.AgentTabledataSource.filter = filterValue;
  }
  // Agent Count
  AgentsCount: number = 0;

  // to handle ajax calls
  httpRequestService: HttpRequestServiceService;

  constructor(
    httpRequestService: HttpRequestServiceService,
    public dialog: MatDialog
  ) { 
    this.AgentTabledataSource.paginator = this.paginator;
    this.httpRequestService = httpRequestService;
  }

  ngOnInit() {
    this.getAgentList();
  }

  getAgentList(){
    this.httpRequestService.getAllCollectionAgents()
      .subscribe(data => {
        if (data['responseCode'] == 200) {
          this.AgentTabledataSource = new MatTableDataSource(data['data']);
          this.AgentTabledataSource.paginator = this.paginator;
          this.AgentsCount = data['data'].length;
        }else{
          this.AgentTabledataSource = new MatTableDataSource();
          this.AgentsCount = 0
        }
      }, error => {
        console.error(JSON.stringify(error));
      });
  }

  openAgentDialog( agentData: AgentRowData, dialogMode: string){
    let data: AgentDialogData = {
      agentData,
      dialogMode
    }
    const dialogRef = this.dialog.open(AddAgentComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAgentList();
    });
  }

}
