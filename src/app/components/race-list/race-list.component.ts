import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, tap } from 'rxjs';
import { IRace } from 'src/app/model/irace';
import { RacesService } from 'src/app/services/races.service';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.scss']
})
export class RaceListComponent {

  constructor(
    private raceService: RacesService,
    private cdRef: ChangeDetectorRef) {
    this.seasons = ['2018', '2019', '2020', '2021', '2022'];
   }
  
  seasons: string[];
  columnsToDisplay = ['race-name'];
  races: IRace[];
  dataSource: MatTableDataSource<IRace>;

  status2021Season$ = this.raceService.status2021Season$.pipe(
    tap(console.log)
  )
  
  raceList$ = this.raceService.raceList$.pipe(
    map(res => this.races = res as IRace[]),
    tap( () => this.updateMatTableData() )
  )

  private paginator: MatPaginator;
  /*
   We are using @ViewChild because of the ngIf with async pipe on the template
   When the data is emmited for the first time from the observable, we need to bind the
   pagination component with the datasource. This can be achieved with the code bellow.
  */
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    if(mp) {
      this.paginator = mp;
      this.dataSource = new MatTableDataSource<IRace>(this.races);
      this.dataSource.paginator = this.paginator;
      this.cdRef.detectChanges();
    }
  }

  /* the behaviour of onSelectionChange is the following:
     A selection change event is fired not only when an option is selected but also when it is deselected
     We want just the first event, that's why we need to check if event.isUserInput
  */
  onSeasonSelected($event: MatOptionSelectionChange, seasonSelected: string): void {
    if($event.isUserInput) {
      this.raceService.seasonSelected(seasonSelected);
    }
  }

  updateMatTableData(): void {
    if(this.paginator) {
      this.dataSource = new MatTableDataSource<IRace>(this.races);
      this.dataSource.paginator = this.paginator;
    }
  }

  onRaceSelected(round: string): void {
    this.races.forEach( race => {
      if(race.round === round) {
        race.isClicked = true;
      } else {
        race.isClicked = false;
      }
    });
    this.updateMatTableData();
    this.raceService.roundSelected(round);
  }
}
