import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, map, of, Observable, throwError, catchError, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IDriver, IPath } from '../model/idriver';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) { }

  ConstructorsArray = [
    { constructorId: 'ferrari', staticInfo: { color: '#ff0000', imgPath: '/assets/img/logos/ferrari.png' } },
    { constructorId: 'alfa', staticInfo: { color: '#a50e2d', imgPath: '/assets/img/logos/alfa.png' } },
    { constructorId: 'haas', staticInfo: { color: '#f7f7f7', imgPath: '/assets/img/logos/haas.png' } },
    { constructorId: 'mclaren', staticInfo: { color: '#fe8000', imgPath: '/assets/img/logos/mclaren.png' } },
    { constructorId: 'mercedes', staticInfo: { color: '#00a19c', imgPath: '/assets/img/logos/mercedes.png' } },
    { constructorId: 'racing_point', staticInfo: { color: '#ff90c3', imgPath: '/assets/img/logos/racing_point.png' } },
    { constructorId: 'red_bull', staticInfo: { color: '#16185f', imgPath: '/assets/img/logos/red_bull.png' }  },
    { constructorId: 'renault', staticInfo: { color: '#fef200', imgPath: '/assets/img/logos/renault.png' }  },
    { constructorId: 'toro_rosso', staticInfo: { color: '#2d64d9', imgPath: '/assets/img/logos/toro_rosso.png' }  },
    { constructorId: 'williams', staticInfo: { color: '#041e42', imgPath: '/assets/img/logos/williams.png' }  },
    { constructorId: 'alphatauri', staticInfo: { color: '#022947', imgPath: '/assets/img/logos/alpha_tauri.png' } },
    { constructorId: 'alpine', staticInfo: { color: '#022947', imgPath: '/assets/img/logos/alpine.png' } },
    { constructorId: 'aston_martin',staticInfo: { color: '#005850', imgPath: '/assets/img/logos/aston_martin.png' }  },
    { constructorId: 'rb',staticInfo: { color: '#1534CC', imgPath: '/assets/img/logos/rb.png' }  },
    { constructorId: 'sauber',staticInfo: { color: '#00C808', imgPath: '/assets/img/logos/sauber.png' }  },
  ];

  private url = 'https://ergast.com/api/f1/';

  private seasonSelectedSubject = new BehaviorSubject<string>('2021');
  seasonSelected$ = this.seasonSelectedSubject.asObservable();

  seasonSelected(seasonSelected: string): void {
    this.spinnerService.showSpinner(true);
    this.seasonSelectedSubject.next(seasonSelected);
  }

  getConstructorInfo(constructorId: string): IPath {
    return this.ConstructorsArray.find( (constructor: any) => constructorId === constructor.constructorId )?.staticInfo as IPath;
  }

  getConstructorColor(constructorId: string): string {
    if(constructorId === 'haas') {
      return '#ed1a3b';
    }
    return this.ConstructorsArray.find( (constructor: any) => constructorId === constructor.constructorId )?.staticInfo.color as string;
  }

  driverList$ = this.seasonSelected$.pipe(
    switchMap( season =>
      season.length ?
          this.http.get<any>(`${this.url}${season}/qualifying.json`).pipe(
            map( res => {
              let drivers: IDriver[];
              drivers = res.MRData.RaceTable.Races[0].QualifyingResults.map( (qualifying: any) => {
                let driver: IDriver = {
                  driverId: qualifying.Driver.driverId,
                  code: qualifying.Driver.code,
                  givenName: qualifying.Driver.givenName,
                  familyName: qualifying.Driver.familyName,
                  constructorId: qualifying.Constructor.constructorId,
                  staticPath: this.getConstructorInfo(qualifying.Constructor.constructorId)
                }
                return driver;
              });
              return drivers.sort((a, b) => a.constructorId.localeCompare(b.constructorId));
            }),
            tap(() => {
              this.spinnerService.showSpinner(false)
            }),
            catchError(this.handleError)
        ) : of(null)),
  );

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message
        }`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
