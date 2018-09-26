import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserAuthInfo, VillageModel } from '../Models/user-auth-info';
import { environment } from '../../environments/environment';
import { AddFarmerDialogData, UpdateFarmerApiData, FarmerTableRowData } from '../Models/farmer';
import { AddAgentApiData, EditAgentApiInfo, DeleteAgentApiData } from '../Models/agent';

@Injectable()
export class HttpRequestServiceService {
  pageUrl: string = environment.apiUrl;
  userDetails: any = {
    mobileNo: "9941840515",
    deviceId: "test",
    deviceModel: "t",
    deviceType: "testType",
    userId: ''
  };
  constructor(private httpClient: HttpClient) {
    if( localStorage.getItem("userId") != null){
      let userDetails = JSON.parse(localStorage.getItem("userId"));
      this.userDetails.mobileNo = userDetails.mobileNo;
      this.userDetails.userId = userDetails.userId;
    }
  }

  setUserMobileNo(mobileNo: string){
    this.userDetails.mobileNo = mobileNo;
  }

  getUserDetails(){
    return this.userDetails;
  }

  /**
   * Significance: to authenticate user (login - 1, signup - 3)
   * @param UserAuthInfo
   */
  authenticateUser(userDetails: UserAuthInfo){
    const options = { 
      params: new HttpParams()
      .set('mobileNo', userDetails.mobileNo)
      .set('password', userDetails.password)
      .set('deviceId', this.userDetails.deviceId)
      .set('deviceModel', this.userDetails.deviceModel)
      .set('deviceType', this.userDetails.deviceType)
      .set('isLogin', userDetails.isLogin)
     };
    return this.httpClient.get(this.pageUrl + '/registerOrLogin.php', options);
  }

  /**
   * Significance: to add a collection agent 
   * @param
   */
  addCollectionAgent(agentInfo: AddAgentApiData){
    agentInfo.mobileNo = this.userDetails.mobileNo;
    return this.httpClient.get(this.pageUrl + '/addCollectionAgent.php', {
      params: Object.entries(agentInfo).reduce(
          (params, [key, value]) => params.set(key, value), new HttpParams())
      });
  }

  /**
   * To get all collection agents
   */
  getAllCollectionAgents(){
    const options = { params: new HttpParams()
      .set('mobileNo', "9941840515")
    };
    return this.httpClient.get(this.pageUrl + '/getCollectionAgents.php', options);
  }

  /**
   * To update an agent info
   */
  updateAgentInfo(agentInfo: EditAgentApiInfo){
    agentInfo.mobileNo = this.userDetails.mobileNo;
    return this.httpClient.get(this.pageUrl + '/updateCollectionAgent.php', {
      params: Object.entries(agentInfo).reduce(
          (params, [key, value]) => params.set(key, value), new HttpParams())
      });
  }

  /**
   * To delete an agent info
   */
  deleteAgent(agentInfo: DeleteAgentApiData){
    agentInfo.mobileNo = this.userDetails.mobileNo;
    return this.httpClient.get(this.pageUrl + '/deleteCollectionAgent.php', {
      params: Object.entries(agentInfo).reduce(
          (params, [key, value]) => params.set(key, value), new HttpParams())
      });
  }

  /**
   * Add a village
   */
  addVillage(villageInfo){
    const options = { params: new HttpParams()
      .set('mobileNo', this.userDetails.mobileNo)
      .set('villageName', villageInfo.villageName)
    };
    return this.httpClient.get(this.pageUrl + '/addVillage.php', options);
  }

  /**
   * get all villages
   */
  getAllVillages(){
    // Add safe, URL encoded search parameter if there is a search term
    const options = { params: new HttpParams()
      .set('mobileNo', this.userDetails.mobileNo)
    };
    return this.httpClient.get(this.pageUrl + '/getVillages.php', options);
  }

  /**
   * update a village info
   */
  updateVillageInfo(villageInfo){
    const options = { params: new HttpParams()
      .set('mobileNo', this.userDetails.mobileNo)
      .set('oldVillageName', villageInfo.oldVillageName)
      .set('newVillageName', villageInfo.newVillageName)
    };
    return this.httpClient.get(this.pageUrl + '/updateVillageName.php', options);
  }

  /**
   * delete a village info
   */
  deleteVillageInfo(villageInfo){
    const options = { params: new HttpParams()
      .set('mobileNo', this.userDetails.mobileNo)
      .set('villageId', villageInfo.village_id)
    };
    return this.httpClient.get(this.pageUrl + '/deleteVillage.php', options); 
  }

  /**
   * add a farmer
   */
  addFarmer(farmerDialogData: AddFarmerDialogData){
    const options = { params: new HttpParams()
      .set('mobileNo', this.userDetails.mobileNo )
      .set('farmerName', farmerDialogData.farmerFormData.farmerName)
      .set('milkType', farmerDialogData.farmerFormData.milkType)
      .set('gender', farmerDialogData.farmerFormData.gender)
      .set('address', farmerDialogData.farmerFormData.address)
      .set('fMobileNo', farmerDialogData.farmerFormData.fMobileNo)
      .set('villageName', farmerDialogData.villageName)
      .set('farmerNo', farmerDialogData.farmerNo)
    };
    return this.httpClient.get(this.pageUrl + '/addFarmer.php', options);
  }

  /**
   * Add or update fat rate
   */
  addOrUpdateFatRate(fatInfo){
    return this.httpClient.get(this.pageUrl + '/addFarmer.php', fatInfo);
  }

  /**
   * Get farmers by village name
   */
  getFarmersByVillageName(villageInfo){
    // Add safe, URL encoded search parameter if there is a search term
    const options = { params: new HttpParams()
      .set('mobileNo', this.userDetails.mobileNo)
      .set('villageName', villageInfo.villageName)
      .set('milkType', villageInfo.milkType)
    };
    return this.httpClient.get(this.pageUrl + '/getAllFarmersOfVillage.php', options);
  }

  /**
   * update farmer info
   */
  updateFarmerInfo(farmerInfo: UpdateFarmerApiData){
    farmerInfo.mobileNo = this.userDetails.mobileNo;
    return this.httpClient.get(this.pageUrl + '/updateFarmer.php', {
      params: Object.entries(farmerInfo).reduce(
          (params, [key, value]) => params.set(key, value), new HttpParams())
      });
  }

  /**
   * delete farmer info
   */
  deleteFarmerInfo(farmerInfo: FarmerTableRowData){
    // Add safe, URL encoded search parameter if there is a search term
    const options = { params: new HttpParams()
      .set('mobileNo', this.userDetails.mobileNo)
      .set('farmerId', farmerInfo.farmer_id)
      .set('villageId', farmerInfo.village_id)
    };
    return this.httpClient.get(this.pageUrl + '/updateFarmer.php', options);
  }

  /**
   * to insert transaction
   */
  insertTransaction(transactionInfo){
    return this.httpClient.get(this.pageUrl + '/insertTransaction.php', transactionInfo);
  }

  /**
   * 
   */


}
