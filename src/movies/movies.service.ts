import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MovieDto } from '@app/movies/dto/movie.dto';

import {
  BackdropSize,
  PosterSize,
  TmdbList,
  TmdbMovie,
  TmdbMoviesResponse,
} from '@app/types';
import { fetchGenres, fetchMovies, mapMovieToDto } from '@app/utils';

@Injectable()
export class MoviesService {
  private apiKey: string;
  private baseUrl: string;
  private imageBaseUrl: string;
  private genresMap?: Map<number, string>;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('TMDB_API_KEY')!;
    this.baseUrl = this.configService.get<string>('TMDB_BASE_URL')!;
    this.imageBaseUrl = this.configService.get<string>('TMDB_IMAGE_BASE_URL')!;
  }

  private async loadGenres() {
    if (!this.genresMap) {
      this.genresMap = await fetchGenres(this.apiKey, this.baseUrl);
    }
    return this.genresMap;
  }

  private async getMovies(
    type: TmdbList,
    page = 1,
    posterSize?: PosterSize,
    backdropSize?: BackdropSize,
  ): Promise<TmdbMoviesResponse<MovieDto>> {
    const genresMap = await this.loadGenres();

    const tmdbResponse = await fetchMovies<TmdbMovie>(
      this.apiKey,
      this.baseUrl,
      type,
      page,
    );

    const moviesDto = tmdbResponse.results.map((movie) =>
      mapMovieToDto(
        movie,
        this.imageBaseUrl,
        posterSize,
        backdropSize,
        genresMap,
      ),
    );

    return {
      ...tmdbResponse,
      results: moviesDto,
    };
  }

  getPopularMovies(page = 1, posterSize?: PosterSize) {
    return this.getMovies('popular', page, posterSize);
  }

  getNowPlayingMovies(page = 1, posterSize?: PosterSize) {
    return this.getMovies('now_playing', page, posterSize);
  }

  getTopRatingMovies(page = 1, posterSize?: PosterSize) {
    return this.getMovies('top_rated', page, posterSize);
  }

  getUpcomingMovies(page = 1, backdropSize?: BackdropSize) {
    return this.getMovies('upcoming', page, undefined, backdropSize);
  }
}
