import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpRequestServiceService {

  constructor(private httpClient: HttpClient) {

  }

  authenticateUser(userDetails){
    this.httpClient.post('/userdetail', userDetails);
  }

}
