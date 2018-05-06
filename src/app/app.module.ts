import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HttpRequestServiceService } from './services/http-request-service.service';
import { AppRoutingModule } from './/app-routing.module';
import { FarmersComponent } from './farmers/farmers.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    FarmersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    AppRoutingModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [HttpRequestServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
