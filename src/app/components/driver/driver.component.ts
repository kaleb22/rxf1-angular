import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';

import { DriversService } from '../../services/drivers.service';
import { SpinnerService } from '../../services/spinner.service';
import { BodyTitleComponent } from '../body-title/body-title.component';

@Component({
  standalone: true,
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, BodyTitleComponent, NgOptimizedImage],
  providers: [DriversService]
})
export class DriverComponent implements OnDestroy {

  constructor(private driversService: DriversService, private spinnerService: SpinnerService) {
    this.seasons = ['2021', '2022', '2023', '2024'];
   }

  seasons: string[];
  defaultSeason: string;

  driversList$ = this.driversService.driverList$;

  seasonSelected$ = this.driversService.seasonSelected$;
  sub: Subscription = this.driversService.seasonSelected$.subscribe( season => {
    console.log('season');
    this.defaultSeason = season;
    this.spinnerService.showSpinner(true);
  });

  /* the behaviour of onSelectionChange is the following:
     A selection change event is fired not only when an option is selected but also when it is deselected
     We want just the first event, that's why we need to check if event.isUserInput
  */
  onSeasonSelected($event: MatOptionSelectionChange, seasonSelected: string) {
    if($event.isUserInput) {
      this.driversService.seasonSelected(seasonSelected);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
