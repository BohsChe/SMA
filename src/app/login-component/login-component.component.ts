import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';


// custom service import
import { HttpRequestServiceService } from '../services/http-request-service.service';
import { AuthService } from '../auth/auth.service';

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
  form: FormGroup;                    // {1}
  private formSubmitAttempt: boolean; // {2}

  public loginModel: any = {
    'isLogin': 1
  };
  public registerModel: any = {
    'isLogin': 2
  };
  public router: Router;
  private HttpRequestServiceService: HttpRequestServiceService;
  // validation
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
  constructor(
    HttpRequestServiceService: HttpRequestServiceService,
    router: Router,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,         // {3}
    private authService: AuthService // {4}
  ) {
    this.HttpRequestServiceService = HttpRequestServiceService;
    this.router = router;
  }

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      mobileNo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }
  onLoginSubmit() {
    if (this.form.valid) {
    this.authService.login(this.form.value); // {7}
    this.HttpRequestServiceService.authenticateUser(this.loginModel)
      .subscribe((data: any) => {
        if (data.responseCode == 200) {
          this.router.navigateByUrl('/villages');
          this.loginModel.userId = data['data'];
          localStorage.removeItem("userId");
          localStorage.setItem("userId", JSON.stringify(this.loginModel));
          this.HttpRequestServiceService.setUserMobileNo(this.loginModel.mobileNo);
          this.openSnackBar(data['responseMessage'], "SUCCESS");
        } else {
          this.openSnackBar(data['responseMessage'], "ERROR");
        }
      });
    }
    this.formSubmitAttempt = true;             // {8}
  }

  onRegisterSubmit() {
    this.HttpRequestServiceService.authenticateUser(this.registerModel)
      .subscribe((data: any) => alert(data));
  }

  openSnackBar(message: string, action: string, ) {
    this.snackBar.open(message, action, {
      announcementMessage: "announce",
      data: "data",
      direction: "ltr",
      duration: 1000
    })
  }

}
