// Angular Core modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Material UI components
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HttpRequestServiceService } from './services/http-request-service.service';
import { AppRoutingModule } from './/app-routing.module';
import { FarmersComponent } from './farmers/farmers.component';

// village
import { VillageComponent } from './village/village.component';
import { AddVillageDialogComponent } from './village/add/add.village.dialog.component';
import { EditVillageComponent } from './village/edit/edit.village.component';
import { DeleteVillageDialogComponent } from './village/delete/delete.component';
import { AddFarmerComponent } from './farmers/add-farmer/add.farmer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    FarmersComponent,
    VillageComponent,
    AddVillageDialogComponent,
    EditVillageComponent,
    DeleteVillageDialogComponent,
    AddFarmerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonToggleModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  entryComponents: [
    AddVillageDialogComponent,
    EditVillageComponent,
    DeleteVillageDialogComponent,
    AddFarmerComponent
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
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  providers: [HttpRequestServiceService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
