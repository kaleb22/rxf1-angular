import { Component } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';


@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent {

  seasons: string[];
  seasonSelected: string;

  constructor() {
    this.seasons = ['2018', '2019', '2020', '2021', '2022'];
  }

  /* the behaviour of onSelectionChange is the following:
     A selection change event is fired not only when an option is selected but also when it is deselected
     We want just the first event, that's why we need to check if event.isUserInput
  */
  onSeasonSelected($event: MatOptionSelectionChange, seasonSelected: string) {
    if($event.isUserInput) {
      console.log('season selected => ', seasonSelected);
    }
  }

}
