import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatExpansionModule, MatTabsModule, MatButtonModule, MatTreeModule, MatTooltipModule } from '@angular/material';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ListComponent,
    ManageComponent,
    AboutComponent,
    FooterComponent,
    ApiCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatTreeModule,
    MatTooltipModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
