import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { RaceListComponent } from './components/race-list/race-list.component';
import { RaceListWrapperComponent } from './components/race-list-wrapper/race-list-wrapper.component';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DriverComponent } from './components/driver/driver.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'drivers', component: DriverComponent },
  { path: 'races', component: RaceListWrapperComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
