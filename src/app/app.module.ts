import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportDocumentDialogComponent } from './shared/dialog/import-document-dialog/import-document-dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ImportDocumentDialogComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    NgJsonEditorModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
