import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  // action stream
  private spinnerSubject = new Subject<boolean>();
  spinnerAction$ = this.spinnerSubject.asObservable();

  showSpinner(show: boolean): void {
    this.spinnerSubject.next(show);
  }
}
