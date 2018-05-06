import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component'
import { FarmersComponent } from './farmers/farmers.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent },
  { path: 'farmers', component: FarmersComponent }
];

@NgModule({
  imports: [
    [ RouterModule.forRoot(routes) ]
  ],
  exports:[RouterModule],
  declarations: []
})

export class AppRoutingModule { 
  
}
