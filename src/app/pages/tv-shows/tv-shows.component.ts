import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss'],
})
export class TvShowsComponent {
  movies: Movie[] = [];

  first: number = 0;

  rows: number = 20;
  genreId: string | null = null;

  searchValue: string | null = null;
  pageNumber: number = 1;

  @ViewChild('p', { static: false }) paginator!: Paginator;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  getPagedMovies(page: number, searchKeyword?: string) {
    this.moviesService
      .searchMovies(page, this.rows, searchKeyword, 'tv')
      .subscribe((movies) => {
        this.movies = movies;
      });
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies;
    });
  }

  // onPageChange(event: any) {
  //   this.first = event.page + 1;

  //   this.rows = event.rows;

  //   this.moviesService
  //     .searchMovies(this.first, this.rows)
  //     .subscribe((movies) => {
  //       this.movies = movies;
  //     });
  // }

  paginate(event: any) {
    this.pageNumber = event.page + 1;

    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, this.pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(this.pageNumber, this.searchValue);
      } else {
        this.getPagedMovies(this.pageNumber);
      }
    }
  }

  searchChanged(e: any) {
    this.pageNumber = 0;
    this.paginator.changePageToFirst(e);
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
