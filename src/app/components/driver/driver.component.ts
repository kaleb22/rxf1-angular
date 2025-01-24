import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { DriversService } from '../../services/drivers.service';
import { BodyTitleComponent } from '../body-title/body-title.component';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    BodyTitleComponent,
    NgOptimizedImage,
  ],
})
export class DriverComponent {
  constructor(private driversService: DriversService) {
    this.seasons = ['2021', '2022', '2023', '2024'];
  }

  seasons: string[];
  driversList = this.driversService.driversList;

  seasonSelected = this.driversService.seasonSelected;

  defaultSeason = computed(() => this.seasonSelected());

  /* the behaviour of onSelectionChange is the following:
     A selection change event is fired not only when an option is selected but also when it is deselected
     We want just the first event, that's why we need to check if event.isUserInput
  */
  onSeasonSelected($event: MatOptionSelectionChange, seasonSelected: string) {
    if ($event.isUserInput) {
      this.driversService.onSeasonSelected(seasonSelected);
    }
  }
}
