import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { RacesService } from './races.service';
import { DriversService } from './drivers.service';
import { SpinnerService } from './spinner.service';
import { of } from 'rxjs';
import { IRace } from '../model/irace';

describe('RacesService', () => {
  let service: RacesService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DriversService,
        SpinnerService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
    });
    service = TestBed.inject(RacesService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of races', () => {
    const mockRacesResponse = {
      MRData: {
        xmlns: 'http://ergast.com/mrd/1.5',
        series: 'f1',
        url: 'http://ergast.com/api/f1/2023.json',
        limit: '30',
        offset: '0',
        total: '22',
        RaceTable: {
          season: '2023',
          Races: [
            {
              season: '2023',
              round: '1',
              url: 'https://en.wikipedia.org/wiki/2023_Bahrain_Grand_Prix',
              raceName: 'Bahrain Grand Prix',
              Circuit: {
                circuitId: 'bahrain',
                url: 'http://en.wikipedia.org/wiki/Bahrain_International_Circuit',
                circuitName: 'Bahrain International Circuit',
                Location: {
                  lat: '26.0325',
                  long: '50.5106',
                  locality: 'Sakhir',
                  country: 'Bahrain',
                },
              },
              date: '2023-03-05',
              time: '15:00:00Z',
              FirstPractice: {
                date: '2023-03-03',
                time: '11:30:00Z',
              },
              SecondPractice: {
                date: '2023-03-03',
                time: '15:00:00Z',
              },
              ThirdPractice: {
                date: '2023-03-04',
                time: '11:30:00Z',
              },
              Qualifying: {
                date: '2023-03-04',
                time: '15:00:00Z',
              },
            },
            {
              season: '2023',
              round: '2',
              url: 'https://en.wikipedia.org/wiki/2023_Saudi_Arabian_Grand_Prix',
              raceName: 'Saudi Arabian Grand Prix',
              Circuit: {
                circuitId: 'jeddah',
                url: 'http://en.wikipedia.org/wiki/Jeddah_Street_Circuit',
                circuitName: 'Jeddah Corniche Circuit',
                Location: {
                  lat: '21.6319',
                  long: '39.1044',
                  locality: 'Jeddah',
                  country: 'Saudi Arabia',
                },
              },
              date: '2023-03-19',
              time: '17:00:00Z',
              FirstPractice: {
                date: '2023-03-17',
                time: '13:30:00Z',
              },
              SecondPractice: {
                date: '2023-03-17',
                time: '17:00:00Z',
              },
              ThirdPractice: {
                date: '2023-03-18',
                time: '13:30:00Z',
              },
              Qualifying: {
                date: '2023-03-18',
                time: '17:00:00Z',
              },
            },
          ],
        },
      },
    };

    const mockRace: IRace[] = [
      {
        round: '1',
        raceName: 'Bahrain Grand Prix',
        isClicked: false,
        date: '2023-03-05',
        imgPath: '../assets/img/tracks/Bahrain.png',
      },
      {
        round: '2',
        raceName: 'Saudi Arabian Grand Prix',
        isClicked: false,
        date: '2023-03-19',
        imgPath: '/assets/img/tracks/Saudi_Arabian.png',
      },
    ];

    const raceSignal = service.raceList;
    jest.spyOn(httpClient, 'get').mockReturnValue(of(mockRacesResponse));

    service.selectedSeasonChanged('2022');
    TestBed.flushEffects();

    expect(raceSignal()).toEqual(mockRace);
  });

  it('should return null when season info is not available', () => {
    const raceSignal = service.raceList;
    service.selectedSeasonChanged('');
    TestBed.flushEffects();
    expect(raceSignal()).toEqual(null);
  });

  it('should return drivers standings', (done) => {
    const mockStandingsResponse = {
      MRData: {
        xmlns: 'http://ergast.com/mrd/1.5',
        series: 'f1',
        url: 'http://ergast.com/api/f1/2023.json',
        limit: '30',
        offset: '0',
        total: '22',
        StandingsTable: {
          season: '2018',
          round: '1',
          StandingsLists: [
            {
              season: '2018',
              round: '1',
              DriverStandings: [
                {
                  position: '1',
                  positionText: '1',
                  points: '25',
                  wins: '1',
                  Driver: {
                    driverId: 'vettel',
                    permanentNumber: '5',
                    code: 'VET',
                    url: 'http://en.wikipedia.org/wiki/Sebastian_Vettel',
                    givenName: 'Sebastian',
                    familyName: 'Vettel',
                    dateOfBirth: '1987-07-03',
                    nationality: 'German',
                  },
                  Constructors: [
                    {
                      constructorId: 'ferrari',
                      url: 'http://en.wikipedia.org/wiki/Scuderia_Ferrari',
                      name: 'Ferrari',
                      nationality: 'Italian',
                    },
                  ],
                },
                {
                  position: '2',
                  positionText: '2',
                  points: '18',
                  wins: '0',
                  Driver: {
                    driverId: 'hamilton',
                    permanentNumber: '44',
                    code: 'HAM',
                    url: 'http://en.wikipedia.org/wiki/Lewis_Hamilton',
                    givenName: 'Lewis',
                    familyName: 'Hamilton',
                    dateOfBirth: '1985-01-07',
                    nationality: 'British',
                  },
                  Constructors: [
                    {
                      constructorId: 'mercedes',
                      url: 'http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One',
                      name: 'Mercedes',
                      nationality: 'German',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    };

    const mockResultsResponse = {
      MRData: {
        xmlns: 'http://ergast.com/mrd/1.5',
        series: 'f1',
        url: 'http://ergast.com/api/f1/2023.json',
        limit: '30',
        offset: '0',
        total: '22',
        RaceTable: [
          {
            season: '2018',
            round: '1',
            Races: [
              {
                season: '2018',
                round: '1',
                url: 'http://en.wikipedia.org/wiki/2018_Australian_Grand_Prix',
                raceName: 'Australian Grand Prix',
                Circuit: {
                  circuitId: 'albert_park',
                  url: 'http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit',
                  circuitName: 'Albert Park Grand Prix Circuit',
                  Location: {
                    lat: '-37.8497',
                    long: '144.968',
                    locality: 'Melbourne',
                    country: 'Australia',
                  },
                },
                date: '2018-03-25',
                time: '05:10:00Z',
                Results: [
                  {
                    number: '5',
                    position: '1',
                    positionText: '1',
                    points: '25',
                    Driver: {
                      driverId: 'vettel',
                      permanentNumber: '5',
                      code: 'VET',
                      url: 'http://en.wikipedia.org/wiki/Sebastian_Vettel',
                      givenName: 'Sebastian',
                      familyName: 'Vettel',
                      dateOfBirth: '1987-07-03',
                      nationality: 'German',
                    },
                    Constructor: {
                      constructorId: 'ferrari',
                      url: 'http://en.wikipedia.org/wiki/Scuderia_Ferrari',
                      name: 'Ferrari',
                      nationality: 'Italian',
                    },
                    grid: '3',
                    laps: '58',
                    status: 'Finished',
                    Time: {
                      millis: '5373283',
                      time: '1:29:33.283',
                    },
                    FastestLap: {
                      rank: '4',
                      lap: '53',
                      Time: {
                        time: '1:26.469',
                      },
                      AverageSpeed: {
                        units: 'kph',
                        speed: '220.782',
                      },
                    },
                  },
                  {
                    number: '44',
                    position: '2',
                    positionText: '2',
                    points: '18',
                    Driver: {
                      driverId: 'hamilton',
                      permanentNumber: '44',
                      code: 'HAM',
                      url: 'http://en.wikipedia.org/wiki/Lewis_Hamilton',
                      givenName: 'Lewis',
                      familyName: 'Hamilton',
                      dateOfBirth: '1985-01-07',
                      nationality: 'British',
                    },
                    Constructor: {
                      constructorId: 'mercedes',
                      url: 'http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One',
                      name: 'Mercedes',
                      nationality: 'German',
                    },
                    grid: '1',
                    laps: '58',
                    status: 'Finished',
                    Time: {
                      millis: '5378319',
                      time: '+5.036',
                    },
                    FastestLap: {
                      rank: '3',
                      lap: '50',
                      Time: {
                        time: '1:26.444',
                      },
                      AverageSpeed: {
                        units: 'kph',
                        speed: '220.845',
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    service.finalResults$.subscribe((res) => {
      expect(res).not.toBe(null);
      done();
    });

    const mockSignal = service.seasonSelected;
    service.selectedSeasonChanged('2022');
    TestBed.flushEffects();

    service.roundSelected('1');

    jest.spyOn(httpClient, 'get').mockReturnValue(of(mockResultsResponse));
    jest.spyOn(httpClient, 'get').mockReturnValue(of(mockStandingsResponse));
    console.log(mockSignal());
  });
});
