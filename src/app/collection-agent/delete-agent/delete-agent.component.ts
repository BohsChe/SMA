import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { HttpRequestServiceService } from '../../services/http-request-service.service';
import { AgentRowData, DeleteAgentApiData } from '../../Models/agent';

@Component({
  selector: 'app-delete-agent',
  templateUrl: './delete-agent.component.html',
  styleUrls: ['./delete-agent.component.css']
})
export class DeleteAgentComponent {

  httpRequestServiceService: HttpRequestServiceService;
  agentInfo: AgentRowData;

  constructor(
    public dialogRef: MatDialogRef<DeleteAgentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgentRowData,
    HttpRequestServiceService: HttpRequestServiceService,
    public snackBar: MatSnackBar) {
    this.httpRequestServiceService = HttpRequestServiceService;
    this.agentInfo = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteAgentSubmit() {
    let data: DeleteAgentApiData = {
      mobileNo: '',
      agentName: this.agentInfo.name
    }
    this.httpRequestServiceService.deleteAgent(data)
      .subscribe(data => {
        if (data['status'] == 200) {
          this.dialogRef.close(data);
          this.openSnackBar(data['statusMessage'], "SUCCESS");
        }else{
          this.openSnackBar(data['statusMessage'], "ERROR");
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
