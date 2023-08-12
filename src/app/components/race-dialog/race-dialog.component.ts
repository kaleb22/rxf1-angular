import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { catchError } from 'rxjs/internal/operators/catchError';
import { IResult } from 'src/app/model/iresult';
import { RacesService } from 'src/app/services/races.service';

@Component({
  selector: 'app-race-dialog',
  templateUrl: './race-dialog.component.html',
  styleUrls: ['./race-dialog.component.scss']
})
export class RaceDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { raceResults: IResult[], raceName: string }) { }

}
