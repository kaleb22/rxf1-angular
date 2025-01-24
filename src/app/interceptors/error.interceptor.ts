import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';

import { SpinnerService } from '../services/spinner.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);
  spinnerService.showSpinner(true);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${
          err.message
        }`;
      }
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    }),
  );
};
