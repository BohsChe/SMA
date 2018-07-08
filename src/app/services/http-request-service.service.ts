import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserAuthInfo } from '../Models/user-auth-info';

@Injectable()
export class HttpRequestServiceService {
  pageUrl: string = "http://shivajimilkcenter.in/MilkProduct/";
  userDetails: any = {
    mobileNo: "9941840511"
  };
  constructor(private httpClient: HttpClient) {

  }

  /**
   * Significance: to authenticate user (login - 1, signup - 3)
   * @param UserAuthInfo
   */
  authenticateUser(userDetails: UserAuthInfo){
    this.httpClient.post('/userdetail', userDetails);
  }

  /**
   * Significance: to add a collection agent 
   * @param
   */
  addCollectionAgent(agentInfo){
    return this.httpClient.get('/addCollectionAgent.php', agentInfo);
  }

  /**
   * To get all collection agents
   */
  getAllCollectionAgents(){
    // TO DO: get user details and sent
    return this.httpClient.get('/getCollectionAgents.php');
  }

  /**
   * To update an agent info
   */
  updateAgentInfo(agentInfo){
    return this.httpClient.get('/updateCollectionAgent.php', agentInfo);
  }

  /**
   * Add a village
   */
  addVillage(villageInfo){
    return this.httpClient.get('/addVillage.php', villageInfo);
  }

  /**
   * get all villages
   */
  getAllVillages(){
    // Add safe, URL encoded search parameter if there is a search term
    const options = { params: new HttpParams()
      .set('mobileNo', this.userDetails.mobileNo)
    };
    return this.httpClient.get('http://shivajimilkcenter.in/MilkProduct/getVillages.php', options);
  }

  /**
   * update a village info
   */
  updateVillageInfo(villageInfo){
    return this.httpClient.get('/updateVillageName.php', villageInfo);
  }

  /**
   * add a farmer
   */
  addFarmer(farmerInfo){
    return this.httpClient.get('/addFarmer.php', farmerInfo);
  }

  /**
   * Add or update fat rate
   */
  addOrUpdateFatRate(fatInfo){
    return this.httpClient.get('/addFarmer.php', fatInfo);
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
    return this.httpClient.get('http://shivajimilkcenter.in/MilkProduct/getAllFarmersOfVillage.php', options);
  }

  /**
   * update farmer info
   */
  updateFarmerInfo(farmerInfo){
    return this.httpClient.get('/updateFarmer.php', farmerInfo);
  }

  /**
   * to insert transaction
   */
  insertTransaction(transactionInfo){
    return this.httpClient.get('/insertTransaction.php', transactionInfo);
  }

  /**
   * 
   */


}
