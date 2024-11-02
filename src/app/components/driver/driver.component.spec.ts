import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { DriverComponent } from './driver.component';
import { DriversService } from '../../services/drivers.service';
import { SpinnerService } from '../../services/spinner.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DriverComponent', () => {
  let component: DriverComponent;
  let fixture: ComponentFixture<DriverComponent>;
  let driverService: DriversService;
  let spinnerService: SpinnerService;

  beforeEach(() => {
     TestBed.configureTestingModule({
      imports: [DriverComponent, BrowserAnimationsModule],
      providers: [DriversService, SpinnerService, provideHttpClient()]
    })
    .compileComponents();

    driverService = TestBed.inject(DriversService);
    spinnerService = TestBed.inject(SpinnerService);
    fixture = TestBed.createComponent(DriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
