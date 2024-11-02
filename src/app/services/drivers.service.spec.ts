import { TestBed } from '@angular/core/testing';
import { provideHttpClient} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { DriversService } from './drivers.service';
import { SpinnerService } from './spinner.service';

describe('DriversService', () => {
  let service: DriversService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriversService, SpinnerService, provideHttpClientTesting(), provideHttpClient() ]
    });
    service = TestBed.inject(DriversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
