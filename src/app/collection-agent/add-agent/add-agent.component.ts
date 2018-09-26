import { Component, OnInit, Inject } from '@angular/core';
// UI modules
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
// to handle ajax calls
import { HttpRequestServiceService } from '../../services/http-request-service.service';
// Models
import { AddAgentApiData, EditAgentApiInfo, AgentRowData, AgentDialogData } from '../../Models/agent';
@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {
  HttpRequestService: HttpRequestServiceService;
  dialogTitle: string;
  dialogBtnText: string;
  dialogMode: string;
  agentInfo: any = {
    agentName: '',
    password: ''
  }
  oldAgentData: AgentRowData;


  constructor(private HttpRequestServiceService: HttpRequestServiceService,
    public dialogRef: MatDialogRef<AddAgentComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: AgentDialogData  ) {
    this.HttpRequestService = HttpRequestServiceService;
    this.dialogMode = data.dialogMode;
    if( data.dialogMode == "EDIT"){
      this.dialogTitle = "Edit Agent Info";
      this.dialogBtnText = "Edit Agent";
      this.agentInfo.agentName = data.agentData.name;
      this.oldAgentData = data.agentData;
    }else{
      this.dialogTitle = "Add Agent Info";
      this.dialogBtnText = "Add Agent" 
    }
  }

  ngOnInit() {
  }

  onSubmit(){
    if(this.dialogMode == "ADD"){
      let data: AddAgentApiData = {
        mobileNo: '',
        agentName: this.agentInfo.agentName,
        agentPassword: this.agentInfo.password
      }
      this.addAgent(data);
    }else{
      let data: EditAgentApiInfo = {
        mobileNo: "",
        newAgentName: this.agentInfo.agentName,
        agentPassword: this.agentInfo.password,
        oldAgentName: this.oldAgentData.name
      }
      this.editAgent(data);
    }
  }

  addAgent( agentData ){
    this.HttpRequestService.addCollectionAgent(agentData)
      .subscribe(data => {
        if (data['responseCode'] == 200) {
          this.dialogRef.close(data);
          this.openSnackBar(data['responseMessage'], "SUCCESS");
        }else{
          this.openSnackBar(data['responseMessage'], "ERROR");
        }
      }, error => {
        console.log(error);
      });
  }

  editAgent( agentData ){
    this.HttpRequestService.updateAgentInfo( agentData )
      .subscribe(data => {
        if (data['responseCode'] == 200) {
          this.dialogRef.close(data);
          this.openSnackBar(data['responseMessage'], "SUCCESS");
        }else{
          this.openSnackBar(data['responseMessage'], "ERROR");
        }
      }, error => {
        console.log(error);
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
