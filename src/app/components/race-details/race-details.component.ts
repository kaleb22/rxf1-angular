import { Component } from '@angular/core';
import { catchError, EMPTY, Subject } from 'rxjs';
import { RacesService } from 'src/app/services/races.service';

@Component({
  selector: 'app-race-details',
  templateUrl: './race-details.component.html',
  styleUrls: ['./race-details.component.scss']
})
export class RaceDetailsComponent {

  constructor(private raceService: RacesService) { }

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  resultsPerRace$ = this.raceService.resultsList$.pipe(
    catchError( err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  qualifyingPerRace$ = this.raceService.qualifyingList$.pipe(
    catchError( err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  )

  standingsPerRace$ = this.raceService.standingList$.pipe(
    catchError( err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  )

}
