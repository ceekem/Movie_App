import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Router } from '@angular/router';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() itemData: Movie | null = null;
  @Input() type: string | null = null;

  selectedType!: string;

  readonly imagesSizes = IMAGES_SIZES;

  constructor(private router: Router) {}

  ngOnInit() {
    // console.log(this.itemData);
  }

  selectedMovie() {
    debugger;
    if (this.type?.includes('TV')) {
      this.selectedType = '/tv/';
      this.router.navigate([`${this.selectedType}${this.itemData?.id}`]);
    } else {
      this.selectedType = '/movie/';
      this.router.navigate([`${this.selectedType}${this.itemData?.id}`]);
    }
  }
}
