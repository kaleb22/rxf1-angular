import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DriverComponent } from './components/driver/driver.component';
import { RaceComponent } from './components/race/race.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'drivers', component: DriverComponent },
  { path: 'races', component: RaceComponent }
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
