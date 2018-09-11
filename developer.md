## Angular CLI commands
ng new <project_name> --routing --style=scss

## Generate angular elements[https://github.com/angular/angular-cli/wiki/generate]
ng g m app-material // generate module
ng g s auth/auth --module=app.module // service
ng g g auth/auth --module=app.module // guard
ng g i auth/user // interface
ng g c header -is // component

## RouteGuard Ref.
https://loiane.com/2017/08/angular-hide-navbar-login-page/#example-2-using-different-layouts-and-routing-config

## Add validation to the form (Reactive Forms)
1. Create a form group(formGroup) with validations for each form fields (formControlName)
2. isFieldInvalid() method to show errors on conditions
3. HTML: Assign form group ref(formGroup) to form and write ngSubmit function
4. HTML: Assign form control name for each form field   
