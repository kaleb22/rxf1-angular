import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  private router = inject(Router);

  goToDriversPage(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/drivers');
  }
}
