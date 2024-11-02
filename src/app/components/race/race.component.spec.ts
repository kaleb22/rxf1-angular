import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { SpinnerService } from './../../services/spinner.service';
import { RacesService } from './../../services/races.service';
import { RaceComponent } from './race.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RaceComponent', () => {
  let component: RaceComponent;
  let fixture: ComponentFixture<RaceComponent>;
  let racesService: RacesService;
  let spinnerService: SpinnerService;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceComponent, MatDialogModule, BrowserAnimationsModule],
      providers: [RacesService, SpinnerService, provideHttpClient()]
    })
    .compileComponents();

    racesService = TestBed.inject(RacesService);
    spinnerService = TestBed.inject(SpinnerService);
    matDialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(RaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
