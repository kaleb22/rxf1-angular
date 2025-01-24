import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { DriverComponent } from './driver.component';
import { DriversService } from '../../services/drivers.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DriverComponent', () => {
  let component: DriverComponent;
  let fixture: ComponentFixture<DriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DriverComponent, BrowserAnimationsModule],
      providers: [DriversService, provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(DriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
