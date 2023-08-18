import { SpinnerService } from './../../services/spinner.service';
import { Component, OnDestroy } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { RacesService } from 'src/app/services/races.service';
import { MatDialog } from '@angular/material/dialog';
import { RaceDialogComponent } from '../race-dialog/race-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnDestroy {

  constructor(
    private raceService: RacesService,
    public dialog: MatDialog,
    private spinnerService: SpinnerService,
  ) {
    this.seasons = ['2021', '2022', '2023'];
  }

  defaultSeason: string = '2021';
  raceName: string;
  seasons: string[];

  raceList$ = this.raceService.raceList$;
  seasonSelected$ = this.raceService.raceSeasonSelectedAction$;

  finalResultsSub: Subscription = this.raceService.finalResults$.subscribe( data => {
    data[0] && data[1] ? this.dialog.open(RaceDialogComponent, {
      data: { raceResults: data, raceName: this.raceName },
      width: '870px'
    }) : '';

    if(data) {
      this.spinnerService.showSpinner(false);
    }
  });

  defaultSeasonSub: Subscription = this.raceService.raceSeasonSelectedAction$.subscribe( season => {
    this.defaultSeason = season;
    this.spinnerService.showSpinner(true);
  });

  /* the behaviour of MatOptionSelectionChange is the following:
    A selection change event is fired not only when an option is selected but also when it is deselected
    We want just the first event, that's why we need to check if event.isUserInput
  */
  onSeasonSelected($event: MatOptionSelectionChange, seasonSelected: string): void {
    if($event.isUserInput) {
      this.raceService.selectedSeasonChanged(seasonSelected);
    }
  }

  openDialog(raceRound: string, raceName: string, date: string) {
    let today = new Date().getTime();
    let raceDate = new Date(date).getTime();
    this.raceName = raceName;

    if(today > raceDate) {
      // race date occured already
      this.raceService.roundSelected(raceRound);
    } else {
      // race didn't happen yet
      this.dialog.open(RaceDialogComponent, {
        data: { raceName: this.raceName }
      });
    }
  }

  ngOnDestroy(): void {
    this.finalResultsSub.unsubscribe();
    this.defaultSeasonSub.unsubscribe();
  }

}
