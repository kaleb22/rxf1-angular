import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { errorInterceptor } from './error.interceptor';
import { SpinnerService } from '../services/spinner.service';

describe('errorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => errorInterceptor(req, next));
  let httpTest: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpinnerService,
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpTest = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should handle server error on requests', () => {
    httpClient.get('/test').subscribe({
      error: (e) => {
        expect(e.status).toEqual(500);
      },
    });

    const req = httpTest.expectOne('/test');
    req.flush('', { status: 500, statusText: 'error' });
  });

  it('should handle client errors on requests', () => {
    httpClient.get('/test').subscribe({
      error: (e) => {
        expect(e.status).toEqual(401);
      },
    });

    httpTest
      .expectOne('/test')
      .error(new ErrorEvent('client side error'), { status: 401 });
  });
});
