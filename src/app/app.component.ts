import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ILink } from './model/ilink';
import { SpinnerService } from './services/spinner.service';
import { HeaderComponent } from './components/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule, MatProgressSpinnerModule]
})
export class AppComponent implements OnInit {
  title = 'rxf1-angular';
  navLinks: ILink[];
  activeLinkIndex = 0;

  constructor(
    private router: Router,
    private spinnerService: SpinnerService
  ) {
    this.navLinks = [
      {
        label: 'List of drivers per season',
        link: './drivers',
        index: 0
      },
      {
        label: 'List of races per season',
        link: './races',
        index: 1
      }
    ]
  }

  spinnerAction$ = this.spinnerService.spinnerAction$;

  ngOnInit(): void {
    this.router.events.subscribe( () => {
      this.activeLinkIndex = this.navLinks.indexOf( this.navLinks.find(tab => tab.link === '.' + this.router.url) as ILink)
    });
  }
}
