import { Component } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { tap } from 'rxjs/operators';
import { DriversService } from 'src/app/services/drivers.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent {

  constructor(private driversService: DriversService) {
    this.seasons = ['2019', '2020', '2021', '2022', '2023'];
   }

  seasons: string[];
  defaultSeason: string = '2019';

  driversList$ = this.driversService.driverList$.pipe(
    tap( (drivers) => console.log(drivers))
  );

  seasonSelected$ = this.driversService.seasonSelected$;

  /* the behaviour of onSelectionChange is the following:
     A selection change event is fired not only when an option is selected but also when it is deselected
     We want just the first event, that's why we need to check if event.isUserInput
  */
     onSeasonSelected($event: MatOptionSelectionChange, seasonSelected: string) {
      if($event.isUserInput) {
        this.driversService.seasonSelected(seasonSelected);
      }
    }
}
