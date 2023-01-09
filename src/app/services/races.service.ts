import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, switchMap, tap } from 'rxjs';
import { IRace } from '../model/irace';

@Injectable({
  providedIn: 'root'
})
export class RacesService {

  constructor(private http: HttpClient) { }

  private races_url = 'http://ergast.com/api/f1/';

  /*
    1 - get the list of races within a year ( http://ergast.com/api/f1/2018.json )
    2 - create the obj to hold all this info
    3 - when user select a race, display the information about the final results (http://ergast.com/api/f1/2018/{{round}}/results.json )
  */

  // action stream
  private raceSeasonSelectedSubject = new BehaviorSubject<string>('');
  raceSeasonSelected$ = this.raceSeasonSelectedSubject.asObservable();

  seasonSelected(seasonSelected: string): void {
    this.raceSeasonSelectedSubject.next(seasonSelected);
  }

  raceList$ = this.raceSeasonSelected$.pipe(
    switchMap( season => 
      season.length ? 
        this.http.get<any>(`${this.races_url}${season}.json`).pipe(
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
