import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, iif, map, mergeMap, of, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
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
  
  /*
    1 - get the list of races within a year ( http://ergast.com/api/f1/2018.json )
    2 - create the obj to hold all this info
    3 - when user select a race, display the information about the final results (http://ergast.com/api/f1/2018/{{round}}/results.json )
  */

  // action stream
  private raceSeasonSelectedSubject = new BehaviorSubject<string>('');
  raceSeasonSelected$ = this.raceSeasonSelectedSubject.asObservable();

  // action stream
  private roundSelectedSubject = new Subject<string>;
  roundSelected$ = this.roundSelectedSubject.asObservable();

  seasonSelected(seasonSelected: string): void {
    this.raceSeasonSelectedSubject.next(seasonSelected);
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
      : of(null)) 
  )

  standingList$ = this.roundSelected$.pipe(
    withLatestFrom(this.raceSeasonSelected$),
    switchMap( ([round, season]) => 
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
    )
  )

  qualifyingList$ = this.roundSelected$.pipe(
    withLatestFrom(this.raceSeasonSelected$),
    switchMap( ([round, season]) => 
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
    )
  )

  resultsList$ = this.roundSelected$.pipe(
    withLatestFrom(this.raceSeasonSelected$),
    tap(([round, season]) => console.log('round / season ', round + ' ' + season)),
    switchMap( ([round, season]) => 
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
    )
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
      : of(null))
  )
}
