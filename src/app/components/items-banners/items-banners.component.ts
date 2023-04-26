import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'items-banner',
  templateUrl: './items-banners.component.html',
  styleUrls: ['./items-banners.component.scss'],
})
export class ItemsBannersComponent {
  @Input() items: Movie[] = [];
  @Input() title: string = '';
}
