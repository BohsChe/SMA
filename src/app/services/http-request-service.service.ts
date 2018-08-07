import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserAuthInfo, VillageModel } from '../Models/user-auth-info';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpRequestServiceService {
  pageUrl: string = environment.apiUrl;
  userDetails: any = {
    mobileNo: "9941840511",
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
  addCollectionAgent(agentInfo){
    return this.httpClient.get(this.pageUrl + '/addCollectionAgent.php', agentInfo);
  }

  /**
   * To get all collection agents
   */
  getAllCollectionAgents(){
    // TO DO: get user details and sent
    return this.httpClient.get(this.pageUrl + '/getCollectionAgents.php');
  }

  /**
   * To update an agent info
   */
  updateAgentInfo(agentInfo){
    return this.httpClient.get(this.pageUrl + '/updateCollectionAgent.php', agentInfo);
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
  addFarmer(farmerInfo){
    return this.httpClient.get(this.pageUrl + '/addFarmer.php', farmerInfo);
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
      .set('mobileNo', villageInfo.mobileNo)
      .set('villageName', villageInfo.villageName)
      .set('milkType', villageInfo.milkType)
    };
    return this.httpClient.get(this.pageUrl + '/getAllFarmersOfVillage.php', options);
  }

  /**
   * update farmer info
   */
  updateFarmerInfo(farmerInfo){
    return this.httpClient.get(this.pageUrl + '/updateFarmer.php', farmerInfo);
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
