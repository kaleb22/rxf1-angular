import { Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { RacesService } from 'src/app/services/races.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent {

  constructor(private raceService: RacesService) {
    this.seasons = ['2018', '2019', '2020', '2021', '2022'];
  }

  seasons: string[];
  raceList$ = this.raceService.raceList$;

    /* the behaviour of onSelectionChange is the following:
     A selection change event is fired not only when an option is selected but also when it is deselected
     We want just the first event, that's why we need to check if event.isUserInput
  */
     onSeasonSelected($event: MatOptionSelectionChange, seasonSelected: string): void {
      if($event.isUserInput) {
        this.raceService.selectedSeasonChanged(seasonSelected);
      }
    }
}
