import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { RacesService } from 'src/app/services/races.service';

@Component({
  selector: 'app-race-details',
  templateUrl: './race-details.component.html',
  styleUrls: ['./race-details.component.scss']
})
export class RaceDetailsComponent {

  constructor(private raceService: RacesService) { }

  resultsPerRace$ = this.raceService.resultsList$.pipe(
    tap(console.log)
  );

  qualifyingPerRace$ = this.raceService.qualifyingList$.pipe(
    tap(console.log)
  )

}
