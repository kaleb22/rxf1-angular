import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  map,
  of,
  Subject,
  switchMap,
  tap,
  zip,
  BehaviorSubject,
  withLatestFrom,
} from 'rxjs';

import { IRace } from '../model/irace';
import { IResult } from '../model/iresult';
import { SpinnerService } from './spinner.service';
import { DriversService } from './drivers.service';

@Injectable({
  providedIn: 'root',
})
export class RacesService {
  private http = inject(HttpClient);
  private spinnerService = inject(SpinnerService);
  private driversService = inject(DriversService);

  private races_url = 'https://ergast.com/api/f1';

  private circuitsArray = [
    {
      circuitId: 'albert_park',
      imgPath: '../assets/img/tracks/Australian.png',
    },
    { circuitId: 'bahrain', imgPath: '../assets/img/tracks/Bahrain.png' },
    {
      circuitId: 'red_bull_ring',
      imgPath: '/assets/img/tracks/Australian.png',
    },
    { circuitId: 'hungaroring', imgPath: '/assets/img/tracks/Hungarian.png' },
    { circuitId: 'silverstone', imgPath: '/assets/img/tracks/British.png' },
    { circuitId: 'catalunya', imgPath: '/assets/img/tracks/Spanish.png' },
    { circuitId: 'spa', imgPath: '/assets/img/tracks/Belgian.png' },
    { circuitId: 'imola', imgPath: '/assets/img/tracks/Emilia_Romagna.png' },
    { circuitId: 'monza', imgPath: '/assets/img/tracks/Italian.png' },
    { circuitId: 'sochi', imgPath: '/assets/img/tracks/Russian.png' },
    { circuitId: 'portimao', imgPath: '/assets/img/tracks/Portuguese.png' },
    { circuitId: 'monaco', imgPath: '/assets/img/tracks/Monaco.png' },
    { circuitId: 'baku', imgPath: '/assets/img/tracks/Azerbaijan.png' },
    { circuitId: 'ricard', imgPath: '/assets/img/tracks/French.png' },
    { circuitId: 'zandvoort', imgPath: '/assets/img/tracks/Dutch.png' },
    { circuitId: 'istanbul', imgPath: '/assets/img/tracks/Turkish.png' },
    { circuitId: 'americas', imgPath: '/assets/img/tracks/United_States.png' },
    { circuitId: 'rodriguez', imgPath: '/assets/img/tracks/Mexican.png' },
    { circuitId: 'interlagos', imgPath: '/assets/img/tracks/Brazilian.png' },
    { circuitId: 'losail', imgPath: '/assets/img/tracks/Qatar.png' },
    { circuitId: 'jeddah', imgPath: '/assets/img/tracks/Saudi_Arabian.png' },
    { circuitId: 'yas_marina', imgPath: '/assets/img/tracks/Abu_Dhabi.png' },
    { circuitId: 'miami', imgPath: '/assets/img/tracks/Miami.png' },
    { circuitId: 'vegas', imgPath: '/assets/img/tracks/Las_Vegas.png' },
    { circuitId: 'villeneuve', imgPath: '/assets/img/tracks/Canadian.png' },
    { circuitId: 'suzuka', imgPath: '/assets/img/tracks/Japanese.png' },
    { circuitId: 'marina_bay', imgPath: '/assets/img/tracks/Singapore.png' },
  ];

  private getCircuitImagePath(circuitId: string): string {
    return this.circuitsArray.find(
      (trackInf) => trackInf.circuitId === circuitId,
    )?.imgPath as string;
  }

  // action stream
  private raceSeasonSelectedSubject = new BehaviorSubject<string>('2021');
  raceSeasonSelectedAction$ = this.raceSeasonSelectedSubject.asObservable();

  // action stream
  private roundSelectedSubject = new Subject<string>();
  roundSelected$ = this.roundSelectedSubject.asObservable();

  selectedSeasonChanged(seasonSelected: string): void {
    this.raceSeasonSelectedSubject.next(seasonSelected);
    // when the filter by season changes, clear the select round
    this.roundSelected('');
  }

  roundSelected(round: string): void {
    this.roundSelectedSubject.next(round);
  }

  standingList$ = this.roundSelected$.pipe(
    withLatestFrom(this.raceSeasonSelectedAction$),
    switchMap(([round, season]) =>
      round.length ? this.getStandingList(round, season) : of(null),
    ),
  );

  private getStandingList(round: string, season: string) {
    return this.http
      .get<any>(`${this.races_url}/${season}/${round}/driverStandings.json`)
      .pipe(
        map((response) => {
          let resultsArr: IResult[];
          resultsArr =
            response.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
              (responseResult: any) => {
                let result: IResult = {
                  position: responseResult.position,
                  driverName: `${responseResult.Driver.givenName} ${responseResult.Driver.familyName}`,
                  constructor: responseResult.Constructors[0].constructorId,
                  points: responseResult.points,
                  constructorColor: this.driversService.getConstructorColor(
                    responseResult.Constructors[0].constructorId,
                  ),
                };
                return result;
              },
            );
          return resultsArr;
        }),
      );
  }

  resultsList$ = this.roundSelected$.pipe(
    withLatestFrom(this.raceSeasonSelectedAction$),
    switchMap(([round, season]) =>
      round.length ? this.getResultsList(round, season) : of(null),
    ),
  );

  private getResultsList(round: string, season: string) {
    return this.http
      .get<any>(`${this.races_url}/${season}/${round}/results.json`)
      .pipe(
        map((response) => {
          let resultsArr: IResult[];
          resultsArr = response.MRData.RaceTable.Races[0].Results.map(
            (responseResult: any) => {
              let result: IResult = {
                position: responseResult.position,
                driverName: `${responseResult.Driver.givenName} ${responseResult.Driver.familyName}`,
                constructor: responseResult.Constructor.constructorId,
                constructorColor: this.driversService.getConstructorColor(
                  responseResult.Constructor.constructorId,
                ),
              };
              return result;
            },
          );
          return resultsArr;
        }),
      );
  }

  raceList$ = this.raceSeasonSelectedAction$.pipe(
    switchMap((season) =>
      season.length ? this.getRaceList(season) : of(null),
    ),
  );

  private getRaceList(season: string) {
    return this.http.get<any>(`${this.races_url}/${season}.json`).pipe(
      map((response) => {
        let racesArr: IRace[];
        racesArr = response.MRData.RaceTable.Races.map((responseRace: any) => {
          let race: IRace = {
            round: responseRace.round,
            raceName: responseRace.raceName,
            isClicked: false,
            date: responseRace.date,
            imgPath: this.getCircuitImagePath(responseRace.Circuit.circuitId),
          };
          return race;
        });
        return racesArr;
      }),
      tap(() => {
        this.spinnerService.showSpinner(false);
      }),
    );
  }

  finalResults$ = zip(this.resultsList$, this.standingList$);
}
