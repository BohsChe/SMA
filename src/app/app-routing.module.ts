import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponentComponent } from './login-component/login-component.component'
import { FarmersComponent } from './farmers/farmers.component'
import { VillageComponent } from './village/village.component'
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: 'login', component: LoginComponentComponent },
  { path: 'login', component: HeaderComponent },
  { path: 'farmers', component: FarmersComponent },
  { path: 'villages', component: VillageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
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
