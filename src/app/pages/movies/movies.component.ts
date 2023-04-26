import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  first: number = 0;

  rows: number = 20;
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getPagedMovies(1);
  }

  getPagedMovies(page: number) {
    this.moviesService.searchMovies(page, this.rows).subscribe((movies) => {
      this.movies = movies;
    });
  }

  onPageChange(event: any) {
    this.first = event.page + 1;

    this.rows = event.rows;

    this.moviesService
      .searchMovies(this.first, this.rows)
      .subscribe((movies) => {
        this.movies = movies;
      });
  }
}
