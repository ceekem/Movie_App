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
    this.route.params.pipe(first()).subscribe(({ id }) => {
      console.log(id);
      this.getMovieDetails(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
    });
  }

  ngOnDestroy() {
    console.log('component destroyed');
  }

  getMovieDetails(id: string) {
    this.mService.getMovie(id).subscribe((movieData) => {
      this.movie = movieData;
      console.log(this.movie);
    });
  }

  getMovieVideos(id: string) {
    this.mService.getMovieVideos(id).subscribe((movieVidData) => {
      console.log(movieVidData);
      this.movieVideos = movieVidData;
    });
  }

  getMovieImages(id: string) {
    this.mService.getMovieImages(id).subscribe((movieImgData: MovieImages) => {
      this.movieImages = movieImgData;
    });
  }

  getMovieCredits(id: string) {
    this.mService.getMovieCredit(id).subscribe((movieCdtData: MovieCredits) => {
      console.log(movieCdtData);
      this.movieCredits = movieCdtData.cast.filter(
        (el: any) => el.profile_path != null
      );
      console.log('removed all null: ', this.movieCredits);
    });
  }
}
