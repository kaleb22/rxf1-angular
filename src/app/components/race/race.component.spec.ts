import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { SpinnerService } from './../../services/spinner.service';
import { RacesService } from './../../services/races.service';
import { RaceComponent } from './race.component';
import { IResult } from 'src/app/model/iresult';
import { signal } from '@angular/core';
import { IRace } from 'src/app/model/irace';

const mock: IResult = {
  position: '1',
  driverName: 'Nick Lauda',
  constructor: 'Mclaren',
  points: '123',
  constructorColor: 'blue',
};

const mockRace: IRace = {
  round: '1',
  raceName: 'singapura',
  date: '12-02-2021',
  imgPath: 'test',
};

describe('RaceComponent', () => {
  let component: RaceComponent;
  let fixture: ComponentFixture<RaceComponent>;
  let raceService: RacesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RaceComponent,
        MatDialogModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatFormFieldModule,
      ],
      providers: [RacesService, SpinnerService, MatDialog, provideHttpClient()],
    }).compileComponents();

    raceService = TestBed.inject(RacesService);
    raceService.finalResults$ = of([[mock], [mock]]);
    fixture = TestBed.createComponent(RaceComponent);
    component = fixture.componentInstance;
    component.raceList = signal([mockRace]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger raceService when select changes', () => {
    const spyOnSeason = jest.spyOn(component, 'onSeasonSelected');

    const selectEl = fixture.debugElement.query(
      By.css('[data-testId="select"]'),
    ).componentInstance;
    const options: MatOption[] = selectEl.options.toArray();
    options[1]._selectViaInteraction();

    fixture.detectChanges();
    expect(spyOnSeason).toHaveBeenCalled();
  });

  it('should open the dialog when button is clicked', () => {
    const spyOnOpenDialog = jest.spyOn(component, 'openDialog');
    const btn: HTMLButtonElement = fixture.debugElement.query(
      By.css('[data-testId="btn-dialog"]'),
    ).nativeElement;
    btn.click();

    fixture.detectChanges();
    expect(spyOnOpenDialog).toHaveBeenCalled();
  });

  it('should open dialog but race did not happen yet', () => {
    const mockFutureRace: IRace = {
      round: '1',
      raceName: 'singapura',
      date: '01-01-2026',
      imgPath: 'test',
    };
    component.raceList = signal([mockFutureRace]);
    fixture.detectChanges();

    const spyOnOpenDialog = jest.spyOn(component, 'openDialog');
    const btn: HTMLButtonElement = fixture.debugElement.query(
      By.css('[data-testId="btn-dialog"]'),
    ).nativeElement;
    btn.click();

    fixture.detectChanges();
    expect(spyOnOpenDialog).toHaveBeenCalled();
  });
});
