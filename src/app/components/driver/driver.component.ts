import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DriversService } from 'src/app/services/drivers.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent {

  constructor(private driversService: DriversService) { }

  driversList$ = this.driversService.driverList$.pipe(
    tap( (drivers) => console.log(drivers))
  );

  seasonSelected$ = this.driversService.seasonSelected$;

}
