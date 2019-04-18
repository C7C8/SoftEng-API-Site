import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatExpansionModule,
  MatTabsModule,
  MatButtonModule,
  MatTreeModule,
  MatTooltipModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule, MatSelectModule, MatTableModule, MatSortModule, MatPaginatorModule, MatSlideToggleModule,
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { ManageComponent } from './pages/manage/manage.component';
import { AboutComponent } from './pages/about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiCardComponent } from './pages/api-card/api-card.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RenderMarkdownPipe } from './render-markdown.pipe';
import { FileUploadComponent } from './pages/api-card/file-upload/file-upload.component';
import { ConfirmDeleteApiComponent } from './pages/api-card/confirm-delete-api/confirm-delete-api.component';
import { ConfirmDeleteAccountComponent } from './pages/manage/confirm-delete-account/confirm-delete-account.component';
import { NospacePipe } from './nospace.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ListComponent,
    ManageComponent,
    AboutComponent,
    ApiCardComponent,
    LoginComponent,
    PageNotFoundComponent,
    RenderMarkdownPipe,
    FileUploadComponent,
    ConfirmDeleteApiComponent,
    ConfirmDeleteAccountComponent,
    NospacePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatTreeModule,
    MatTooltipModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  entryComponents: [
    FileUploadComponent,
    ConfirmDeleteApiComponent,
    ConfirmDeleteAccountComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
