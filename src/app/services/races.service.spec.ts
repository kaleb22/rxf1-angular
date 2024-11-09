import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { RacesService } from './races.service';
import { DriversService } from './drivers.service';
import { SpinnerService } from './spinner.service';

describe('RacesService', () => {
  let service: RacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriversService, SpinnerService, provideHttpClientTesting(), provideHttpClient() ]
    });
    service = TestBed.inject(RacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
