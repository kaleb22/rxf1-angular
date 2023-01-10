import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from "@angular/router/testing";
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgHttpCachingModule, NgHttpCachingConfig } from 'ng-http-caching';

import { AppComponent } from './app.component';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { RaceListComponent } from './components/race-list/race-list.component';
import { RaceListWrapperComponent } from './components/race-list-wrapper/race-list-wrapper.component';
import { RaceDetailsComponent } from './components/race-details/race-details.component';
import { ResultsComponent } from './components/results/results.component';


const ngHttpCachingConfig: NgHttpCachingConfig = {
  lifetime: 1000 * 60 * 10, // cache expire after 10 min,
  allowedMethod: ['GET', 'HEAD']
};

@NgModule({
  declarations: [
    AppComponent,
    DriverListComponent,
    RaceListComponent,
    RaceListWrapperComponent,
    RaceDetailsComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    RouterModule,
    RouterTestingModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    NgHttpCachingModule.forRoot(ngHttpCachingConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
