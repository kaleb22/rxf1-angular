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
    tap( res => console.log('race finals =>', res))
  );

  qualifyingPerRace$ = this.raceService.qualifyingList$.pipe(
    tap( res => console.log('quali finals =>', res))
  )

  standingsPerRace$ = this.raceService.standingList$.pipe(
    tap(console.log)
  )

}
