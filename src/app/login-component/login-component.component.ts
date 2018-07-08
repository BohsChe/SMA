import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  public loginModel:any = {};
  public registerModel:any = {};

  constructor() { }

  ngOnInit() {
  }

  loginUser(){
    alert( JSON.stringify( this.loginModel) );
  }

}
