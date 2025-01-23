import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { IResult } from 'src/app/model/iresult';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  imports: [CommonModule],
})
export class ResultsComponent {
  @Input() title: string;
  @Input() results: IResult[];
  @Input() standing: boolean;
}
