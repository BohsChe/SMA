import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

// custom service import
import {HttpRequestServiceService} from '../services/http-request-service.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  public loginModel:any = {
    'isLogin': 2
  };
  public registerModel:any = {
    'isLogin': 1
  };
  private HttpRequestServiceService: HttpRequestServiceService;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(12),
    Validators.pattern('[0-9]+')  // validates input is digit
  ]);

  passwordFormControl = new FormControl('loginPassword', [
    Validators.required,
    Validators.minLength(6)
  ]);
  
  matcher = new MyErrorStateMatcher();
  constructor(HttpRequestServiceService: HttpRequestServiceService) {
    this.HttpRequestServiceService = HttpRequestServiceService;
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    this.HttpRequestServiceService.authenticateUser(this.loginModel)
    .subscribe((data: any) => alert(data));
  }

  onRegisterSubmit(){
    this.HttpRequestServiceService.authenticateUser(this.registerModel)
    .subscribe((data: any) => alert(data));
  }

}
