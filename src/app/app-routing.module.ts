import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  {
    path: 'drivers',
    loadComponent: () =>
      import('./components/driver/driver.component').then(m => m.DriverComponent)
  },
  { path: 'races',
    loadComponent: () =>
      import('./components/race/race.component').then(m => m.RaceComponent)
  }
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
