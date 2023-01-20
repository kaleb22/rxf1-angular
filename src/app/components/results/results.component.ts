import { Component, Input } from '@angular/core';
import { IResult } from 'src/app/model/iresult';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  constructor() { }

  @Input() title: string;
  @Input() results: IResult[];
}
