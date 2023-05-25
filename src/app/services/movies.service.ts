import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MovieDto,
  Movie,
  MovieVideosDTO,
  MovieImages,
  MovieCredits,
} from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GenresDTO } from '../models/genre';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  baseUrl = 'https://api.themoviedb.org/3';
  apiKey = 'b43c3a837b036b696579ef55f036b6a0';

  constructor(private http: HttpClient) {}

  getMovies(
    type: string = 'upcoming',
    show: string = 'movie',
    count: number = 12
  ) {
    return this.http
      .get<MovieDto>(`${this.baseUrl}/${show}/${type}?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }

  getMoviesByGenre(genreId: string, page: number) {
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  searchMovies(page: number = 1, count: number = 20, searchValue?: string) {
    const uri = searchValue ? '/search/movie' : '/movie/popular';
    // debugger;
    if (searchValue) {
      return this.http
        .get<MovieDto>(
          `${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
        )
        .pipe(
          switchMap((res) => {
            console.log('search: ', res);
            return of(res.results.slice(0, count));
          })
        );
    } else {
      return this.http
        .get<MovieDto>(
          `${this.baseUrl}${uri}?page=${page}&api_key=${this.apiKey}`
        )
        .pipe(
          switchMap((res) => {
            return of(res.results.slice(0, count));
          })
        );
    }
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}/movie/popular?page=${page}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }

  getMovie(id: string) {
    return this.http.get<Movie>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`
    );
    // .pipe(
    //   switchMap((res) => {
    //     return of(res.results.slice(0, count));
    //   })
    // );
  }

  getMovieVideos(id: string) {
    return this.http
      .get<MovieVideosDTO>(
        `${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getMoviesGenres() {
    return this.http
      .get<GenresDTO>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.genres);
        })
      );
  }

  getMovieImages(id: string) {
    return this.http.get<MovieImages>(
      `${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`
    );
  }

  getMovieCredit(id: string) {
    return this.http.get<MovieCredits>(
      `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
    );
  }
}
