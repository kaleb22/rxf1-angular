import { Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable } from 'rxjs';
import { IDriver } from 'src/app/model/idriver';
import { DriversService } from 'src/app/services/drivers.service';


@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent implements OnInit {

  seasons: string[];
  seasonSelected: string;
  driverList$ = this.driverService.driverList$;

  constructor(private driverService: DriversService) {
    this.seasons = ['2018', '2019', '2020', '2021', '2022'];
  }

  ngOnInit(): void {
  }

  /* the behaviour of onSelectionChange is the following:
     A selection change event is fired not only when an option is selected but also when it is deselected
     We want just the first event, that's why we need to check if event.isUserInput
  */
  onSeasonSelected($event: MatOptionSelectionChange, seasonSelected: string) {
    if($event.isUserInput) {
      this.driverService.seasonSelected(seasonSelected);
    }
  }

}
