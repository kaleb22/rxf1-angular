import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { IResult } from 'src/app/model/iresult';
import { ResultsComponent } from '../results/results.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-race-dialog',
  templateUrl: './race-dialog.component.html',
  styleUrls: ['./race-dialog.component.scss'],
  imports: [MatDialogModule, NgIf, ResultsComponent, MatButtonModule]
})
export class RaceDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { raceResults: IResult[][], raceName: string }) { }

}
