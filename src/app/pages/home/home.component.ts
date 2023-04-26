import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie, MovieDto } from '../../models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  popularTVShows: Movie[] = [];

  constructor(private mService: MoviesService) {}

  ngOnInit(): void {
    this.mService.getMovies('popular').subscribe((movies) => {
      this.popularMovies = movies;
    });

    this.mService.getMovies().subscribe((movies) => {
      this.upcomingMovies = movies;
    });

    this.mService.getMovies('top_rated').subscribe((movies) => {
      this.topRatedMovies = movies;
    });

    this.mService.getMovies('top_rated', 'tv').subscribe((shows) => {
      this.popularTVShows = shows;
    });
  }
}
