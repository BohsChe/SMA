import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponentComponent } from './login-component/login-component.component'
import { FarmersComponent } from './farmers/farmers.component'
import { VillageComponent } from './village/village.component'
import { CollectionAgentComponent } from './collection-agent/collection.agent.component';
import { FatComponent } from "./fat/fat.component";
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: 'login', component: LoginComponentComponent },
  { path: 'farmers', component: FarmersComponent, canActivate: [AuthGuard] },
  { path: 'villages', component: VillageComponent, canActivate: [AuthGuard] },
  { path: 'collection-agents', component: CollectionAgentComponent, canActivate: [AuthGuard] },
  { path: 'fats', component: FatComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule {

}
