import { Routes } from "@angular/router";

import { WelcomeComponent } from "./components/welcome/welcome.component";
import { DriverComponent } from "./components/driver/driver.component";
import { RaceComponent } from "./components/race/race.component";

export const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'drivers', component: DriverComponent },
  { path: 'races', component: RaceComponent }
]
