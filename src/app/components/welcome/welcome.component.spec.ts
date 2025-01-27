import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeComponent],
      providers: [Router],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to drivers page when btn is clicked', () => {
    const spyGoToDrivers = jest.spyOn(component, 'goToDriversPage');
    const btn = fixture.debugElement.query(
      By.css('[data-testId="main-btn"]'),
    ).nativeElement;
    btn.click();
    fixture.detectChanges();

    expect(spyGoToDrivers).toHaveBeenCalled();
  });
});
