import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  fetchGenres,
  fetchPopularMovies,
  mapMovieToDto,
} from '@app/utils/tmdb';
import { MovieDto } from './dto/movie.dto';
import { TmdbMovie } from './types/tmdb.types';

@Injectable()
export class MoviesService {
  constructor(private readonly configService: ConfigService) {}

  async getPopularMovies(page = 1): Promise<MovieDto[]> {
    const apiKey = this.configService.get<string>('TMDB_API_KEY')!;
    const baseUrl = this.configService.get<string>('TMDB_BASE_URL')!;
    const imageBaseUrl = this.configService.get<string>('TMDB_IMAGE_BASE_URL')!;

    const genresMap = await fetchGenres(apiKey, baseUrl);
    const { results } = await fetchPopularMovies(apiKey, baseUrl, page);

    return results.map((movie: TmdbMovie) =>
      mapMovieToDto(movie, genresMap, imageBaseUrl),
    );
  }
}
