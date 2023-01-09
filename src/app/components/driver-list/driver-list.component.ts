import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DriversService } from 'src/app/services/drivers.service';
import { IDriver } from 'src/app/model/idriver';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss'],
})
export class DriverListComponent {

  constructor(private cdRef: ChangeDetectorRef, private driverService: DriversService) {
    this.seasons = ['2018', '2019', '2020', '2021', '2022'];
  }

  seasons: string[];
  seasonSelected: string;
  drivers: IDriver[];
  columnsToDisplay = ['name', 'nationality', 'birthday'];
  dataSource: MatTableDataSource<IDriver>;

  driverList$ = this.driverService.driverList$.pipe(
    map( drivers =>  this.drivers = drivers as IDriver[] ),
    tap( drivers =>  { 
      console.log(drivers)
      this.updateMatTableData();
    })
  );

  private paginator: MatPaginator;
  /*
   We are using @ViewChild because of the ngIf with async pipe on the template
   When the data is emmited for the first time from the observable, we need to bind the
   pagination component with the datasource. This can be achieved with the code bellow.
  */
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    if(mp) {
      this.paginator = mp;
      this.dataSource = new MatTableDataSource<IDriver>(this.drivers);
      this.dataSource.paginator = this.paginator;
      this.cdRef.detectChanges();
    }
  }

  updateMatTableData(): void {
    if(this.paginator) {
      this.dataSource = new MatTableDataSource<IDriver>(this.drivers);
      this.dataSource.paginator = this.paginator;
    }
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
