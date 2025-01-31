import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, MatIconModule, MatMenuModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect page', () => {
    const spyOnRedirect = jest.spyOn(component, 'redirectPage');
    const btn = fixture.debugElement.query(By.css('button')).nativeElement;
    btn.click();

    const btnMatMenu = fixture.debugElement.query(
      By.css('[data-testId="btn-redirect-drivers"]'),
    ).nativeElement;
    btnMatMenu.click();

    expect(spyOnRedirect).toHaveBeenCalled();
  });
});
