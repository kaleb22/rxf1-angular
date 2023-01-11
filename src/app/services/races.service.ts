import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject, switchMap, tap, throwError, withLatestFrom } from 'rxjs';
import { IRace } from '../model/irace';
import { IResult } from '../model/iresult';
import { IStatus } from '../model/istatus';

@Injectable({
  providedIn: 'root'
})
export class RacesService {

  constructor(private http: HttpClient) { }

  private races_url = 'http://ergast.com/api/f1';
  private STATUS_FINISHED = '1';
  private STATUS_ACCIDENT = '3';
  private STATUS_MORETHAN_ONE_LAP = '11';
  
  // action stream
  private raceSeasonSelectedSubject = new BehaviorSubject<string>('');
  raceSeasonSelected$ = this.raceSeasonSelectedSubject.asObservable();

  // action stream
  private roundSelectedSubject = new Subject<string>;
  roundSelected$ = this.roundSelectedSubject.asObservable();

  seasonSelected(seasonSelected: string): void {
    this.raceSeasonSelectedSubject.next(seasonSelected);
    // when the filter by season changes, clear the select round
    this.roundSelected('');
  }

  roundSelected(round: string): void {
    this.roundSelectedSubject.next(round);
  }

  status2021Season$ = this.raceSeasonSelected$.pipe(
    switchMap( season => 
      season === '2021' ? 
        this.http.get<any>(`${this.races_url}/${season}/status.json`).pipe(
          map( response => {
            let statusArr: IStatus[];
            statusArr = response.MRData.StatusTable.Status.filter( (responseStatus: IStatus) => {
              return responseStatus.statusId === this.STATUS_FINISHED || 
                responseStatus.statusId === this.STATUS_ACCIDENT ||
                responseStatus.statusId === this.STATUS_MORETHAN_ONE_LAP;     
            })
            return statusArr;
          })
        ) 
      : of(null)),
    catchError(this.handleError)
  )

  standingList$ = this.roundSelected$.pipe(
    withLatestFrom(this.raceSeasonSelected$),
    switchMap( ([round, season]) => 
      round.length ? 
        this.http.get<any>(`${this.races_url}/${season}/${round}/driverStandings.json`).pipe(
          map( response => {
            let resultsArr: IResult[];
            resultsArr = response.MRData.StandingsTable.StandingsLists[0].DriverStandings.map( (responseResult:any) => {
              let result: IResult = {
                position: responseResult.position,
                driverName: `${responseResult.Driver.givenName} ${responseResult.Driver.familyName}`,
                constructor: responseResult.Constructors[0].constructorId,
                points: responseResult.points
              }
              return result;
            });
            return resultsArr;
          })
        )
    : of(null)),
    catchError(this.handleError)
  )

  qualifyingList$ = this.roundSelected$.pipe(
    withLatestFrom(this.raceSeasonSelected$),
    switchMap( ([round, season]) => 
      round.length ?
        this.http.get<any>(`${this.races_url}/${season}/${round}/qualifying.json`).pipe(
          map( response => {
            let resultsArr: IResult[];
            resultsArr = response.MRData.RaceTable.Races[0].QualifyingResults.map( (responseResult:any) => {
              let result: IResult = {
                position: responseResult.position,
                driverName: `${responseResult.Driver.givenName} ${responseResult.Driver.familyName}`,
                constructor: responseResult.Constructor.constructorId
              }
              return result;
            });
            return resultsArr;
          })
        )
    : of(null)),
    catchError(this.handleError)
  )

  resultsList$ = this.roundSelected$.pipe(
    withLatestFrom(this.raceSeasonSelected$),
    switchMap( ([round, season]) => 
      round.length ?
        this.http.get<any>(`${this.races_url}/${season}/${round}/results.json`).pipe(
          map( response => {
            let resultsArr: IResult[];
            resultsArr = response.MRData.RaceTable.Races[0].Results.map( (responseResult:any) => {
              let result: IResult = {
                position: responseResult.position,
                driverName: `${responseResult.Driver.givenName} ${responseResult.Driver.familyName}`,
                constructor: responseResult.Constructor.constructorId
              }
              return result;
            });
            return resultsArr;
          })
        )
    : of(null)),
    catchError(this.handleError)
  )

  raceList$ = this.raceSeasonSelected$.pipe(
    switchMap( season => 
      season.length ? 
        this.http.get<any>(`${this.races_url}/${season}.json`).pipe(
          map( response => {
            let racesArr: IRace[];
            racesArr = response.MRData.RaceTable.Races.map( ( responseRace: any ) => {
              let race: IRace = {
                round: responseRace.round,
                raceName: responseRace.raceName,
                isClicked: false
              };
              return race;
            });
            return racesArr;
          })
        ) 
      : of(null)),
    catchError(this.handleError)
  )

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message
        }`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
