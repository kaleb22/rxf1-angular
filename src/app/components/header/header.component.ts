import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [MatIconModule, MatMenuModule]
})
export class HeaderComponent {

  constructor(private router: Router) {}

  redirectPage(route: string): void {
    this.router.navigateByUrl(route);
  }
}
