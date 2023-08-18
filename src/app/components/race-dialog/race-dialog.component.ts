import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IResult } from 'src/app/model/iresult';

@Component({
  selector: 'app-race-dialog',
  templateUrl: './race-dialog.component.html',
  styleUrls: ['./race-dialog.component.scss']
})
export class RaceDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { raceResults: IResult[][], raceName: string }) { }

}
