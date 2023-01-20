import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, map, of, Observable, throwError, catchError, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IDriver } from '../model/idriver';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class DriversService {
  
  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) { }
  
  private url = 'http://ergast.com/api/f1/';

  private seasonSelectedSubject = new BehaviorSubject<string>('');
  seasonSelected$ = this.seasonSelectedSubject.asObservable();

  seasonSelected(seasonSelected: string): void {
    this.spinnerService.showSpinner(true);
    this.seasonSelectedSubject.next(seasonSelected);
  }

  driverList$ = this.seasonSelected$.pipe(
    switchMap( season =>
      season.length ?
          this.http.get<any>(`${this.url}${season}/drivers.json`).pipe(
            map(data => data.MRData.DriverTable.Drivers as IDriver[]),
            tap(() => this.spinnerService.showSpinner(false)),
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
