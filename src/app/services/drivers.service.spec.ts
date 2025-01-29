import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { DriversService } from './drivers.service';
import { SpinnerService } from './spinner.service';
import { of } from 'rxjs';
import { IDriver } from '../model/idriver';

describe('DriversService', () => {
  let service: DriversService;
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
    service = TestBed.inject(DriversService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get drivers', () => {
    const mockDriversResponse = {
      MRData: {
        series: 'f1',
        url: 'http://ergast.com/api/f1/2024/1/qualifying.json',
        limit: '30',
        offset: '0',
        total: '20',
        RaceTable: {
          season: '2024',
          round: '1',
          Races: [
            {
              season: '2024',
              round: '1',
              url: 'https://en.wikipedia.org/wiki/2024_Bahrain_Grand_Prix',
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
              date: '2024-03-02',
              time: '15:00:00Z',
              QualifyingResults: [
                {
                  number: '1',
                  position: '1',
                  Driver: {
                    driverId: 'max_verstappen',
                    permanentNumber: '33',
                    code: 'VER',
                    url: 'http://en.wikipedia.org/wiki/Max_Verstappen',
                    givenName: 'Max',
                    familyName: 'Verstappen',
                    dateOfBirth: '1997-09-30',
                    nationality: 'Dutch',
                  },
                  Constructor: {
                    constructorId: 'red_bull',
                    url: 'http://en.wikipedia.org/wiki/Red_Bull_Racing',
                    name: 'Red Bull',
                    nationality: 'Austrian',
                  },
                  Q1: '1:30.031',
                  Q2: '1:29.374',
                  Q3: '1:29.179',
                },
                {
                  number: '16',
                  position: '2',
                  Driver: {
                    driverId: 'leclerc',
                    permanentNumber: '16',
                    code: 'LEC',
                    url: 'http://en.wikipedia.org/wiki/Charles_Leclerc',
                    givenName: 'Charles',
                    familyName: 'Leclerc',
                    dateOfBirth: '1997-10-16',
                    nationality: 'Monegasque',
                  },
                  Constructor: {
                    constructorId: 'ferrari',
                    url: 'http://en.wikipedia.org/wiki/Scuderia_Ferrari',
                    name: 'Ferrari',
                    nationality: 'Italian',
                  },
                  Q1: '1:30.243',
                  Q2: '1:29.165',
                  Q3: '1:29.407',
                },
              ],
            },
          ],
        },
      },
    };

    const driversResponse: IDriver[] = [
      {
        driverId: 'leclerc',
        code: 'LEC',
        givenName: 'Charles',
        familyName: 'Leclerc',
        constructorId: 'ferrari',
        staticPath: {
          color: '#ff0000',
          imgPath: '/assets/img/logos/ferrari.png',
        },
      },
      {
        driverId: 'max_verstappen',
        code: 'VER',
        givenName: 'Max',
        familyName: 'Verstappen',
        constructorId: 'red_bull',
        staticPath: {
          color: '#16185f',
          imgPath: '/assets/img/logos/red_bull.png',
        },
      },
    ];

    const driversSignal = service.driversList;
    jest.spyOn(httpClient, 'get').mockReturnValue(of(mockDriversResponse));

    service.onSeasonSelected('2022');
    TestBed.flushEffects();

    expect(driversSignal()).toEqual(driversResponse);
  });

  it('should return null when there is no season information', () => {
    const driversSignal = service.driversList;

    service.onSeasonSelected('');
    TestBed.flushEffects();

    expect(driversSignal()).toBe(null);
  });

  it('should get color from haas constructor', () => {
    const color = service.getConstructorColor('haas');
    expect(color).toBe('#ed1a3b');
  });

  it('should get constructor color based on id', () => {
    const color = service.getConstructorColor('sauber');
    expect(color).toBe('#00C808');
  });
});
