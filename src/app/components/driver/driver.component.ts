import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { MatOptionSelectionChange } from '@angular/material/core';
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

  onSeasonSelected(seasonSelected: string) {
    this.driversService.onSeasonSelected(seasonSelected);
  }
}
