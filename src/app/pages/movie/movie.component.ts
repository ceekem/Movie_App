import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import {
  Movie,
  MovieCredits,
  MovieImages,
  MovieVideos,
} from '../../models/movie';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  movieVideos: MovieVideos[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits['cast'] | null = null;
  movie: Movie | null = null;
  imagesSizes = IMAGES_SIZES;

  constructor(private route: ActivatedRoute, private mService: MoviesService) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id, type }) => {
      console.log(id);
      this.getMovieDetails(id, type);
      this.getMovieVideos(id, type);
      this.getMovieImages(id, type);
      this.getMovieCredits(id, type);
    });
  }

  ngOnDestroy() {
    console.log('component destroyed');
  }

  getMovieDetails(id: string, type: string) {
    this.mService.getMovie(id, type).subscribe((movieData) => {
      this.movie = movieData;
      console.log(this.movie);
    });
  }

  getMovieVideos(id: string, type: string) {
    this.mService.getMovieVideos(id, type).subscribe((movieVidData) => {
      console.log(movieVidData);
      this.movieVideos = movieVidData;
    });
  }

  getMovieImages(id: string, type: string) {
    this.mService
      .getMovieImages(id, type)
      .subscribe((movieImgData: MovieImages) => {
        this.movieImages = movieImgData;
      });
  }

  getMovieCredits(id: string, type: string) {
    this.mService
      .getMovieCredit(id, type)
      .subscribe((movieCdtData: MovieCredits) => {
        console.log(movieCdtData);
        this.movieCredits = movieCdtData.cast.filter(
          (el: any) => el.profile_path != null
        );
        console.log('removed all null: ', this.movieCredits);
      });
  }
}
