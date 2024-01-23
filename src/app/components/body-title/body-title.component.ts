import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-body-title',
  templateUrl: './body-title.component.html',
  styleUrls: ['./body-title.component.scss'],
})
export class BodyTitleComponent {

  @Input() title: string;

}
