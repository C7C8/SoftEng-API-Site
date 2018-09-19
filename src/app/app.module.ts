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
  MatDialogModule, MatSelectModule,
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
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiCardComponent } from './pages/list/api-card/api-card.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RenderMarkdownPipe } from './render-markdown.pipe';
import { FileUploadComponent } from './pages/list/api-card/file-upload/file-upload.component';
import { AreYouSureComponent } from './pages/list/api-card/are-you-sure/are-you-sure.component';
import { ConfirmDeleteAccountComponent } from './pages/manage/confirm-delete-account/confirm-delete-account.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ListComponent,
    ManageComponent,
    AboutComponent,
    FooterComponent,
    ApiCardComponent,
    LoginComponent,
    PageNotFoundComponent,
    RenderMarkdownPipe,
    FileUploadComponent,
    AreYouSureComponent,
    ConfirmDeleteAccountComponent
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
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  entryComponents: [
    FileUploadComponent,
    AreYouSureComponent,
    ConfirmDeleteAccountComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
