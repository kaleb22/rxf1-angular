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
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgHttpCachingModule, NgHttpCachingConfig, NgHttpCachingStrategy } from 'ng-http-caching';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ResultsComponent } from './components/results/results.component';
import { DriverComponent } from './components/driver/driver.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HeaderComponent } from './components/header/header.component';
import { RaceComponent } from './components/race/race.component';
import { BodyTitleComponent } from './components/body-title/body-title.component';
import { RaceDialogComponent } from './components/race-dialog/race-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


const ngHttpCachingConfig: NgHttpCachingConfig = {
  lifetime: 1000 * 60 * 10, // cache expire after 10 min,
  allowedMethod: ['GET', 'HEAD'],
  cacheStrategy: NgHttpCachingStrategy.ALLOW_ALL
};

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    DriverComponent,
    WelcomeComponent,
    HeaderComponent,
    RaceComponent,
    BodyTitleComponent,
    RaceDialogComponent,
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
    NgHttpCachingModule.forRoot(ngHttpCachingConfig),
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
