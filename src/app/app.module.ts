import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from "@angular/router/testing";
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { RaceListComponent } from './components/race-list/race-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DriverListComponent,
    RaceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    RouterModule,
    RouterTestingModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
