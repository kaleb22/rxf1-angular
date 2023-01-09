import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceListWrapperComponent } from './race-list-wrapper.component';

describe('RaceListWrapperComponent', () => {
  let component: RaceListWrapperComponent;
  let fixture: ComponentFixture<RaceListWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceListWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
