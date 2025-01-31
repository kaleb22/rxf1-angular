import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { DriverComponent } from './driver.component';
import { DriversService } from '../../services/drivers.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

describe('DriverComponent', () => {
  let component: DriverComponent;
  let fixture: ComponentFixture<DriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DriverComponent,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
      ],
      providers: [DriversService, provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(DriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call drivers service when season changes', () => {
    const spyOnSel = jest.spyOn(component, 'onSeasonSelected');

    fixture.debugElement
      .query(By.directive(MatSelect))
      .triggerEventHandler('selectionChange', { value: '2021' });
    fixture.detectChanges();

    expect(spyOnSel).toHaveBeenCalled();
  });
});
