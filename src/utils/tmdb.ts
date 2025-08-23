import { MovieDto } from '@app/movies/dto/movie.dto';
import { plainToInstance } from 'class-transformer';
import {
  TmdbGenresResponse,
  TmdbMovie,
  TmdbPopularMoviesResponse,
} from '@app/movies/types/tmdb.types';

export async function fetchGenres(
  apiKey: string,
  baseUrl: string,
): Promise<Map<number, string>> {
  const res = await fetch(
    `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`,
  );
  if (!res.ok) throw new Error('Failed to fetch genres');

  const { genres }: TmdbGenresResponse = await res.json();
  return new Map(genres.map(({ id, name }) => [id, name]));
}

export async function fetchPopularMovies(
  apiKey: string,
  baseUrl: string,
  page = 1,
): Promise<TmdbPopularMoviesResponse> {
  const res = await fetch(
    `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`,
  );
  if (!res.ok) throw new Error('Failed to fetch popular movies');

  return res.json();
}

export function mapMovieToDto(
  { title, vote_average, poster_path, genre_ids }: TmdbMovie,
  genresMap: Map<number, string>,
  imageBaseUrl: string,
): MovieDto {
  const result = {
    title: title,
    rating: vote_average,
    poster: poster_path ? `${imageBaseUrl}${poster_path}` : null,
    genres: genre_ids.map((id) => genresMap.get(id) ?? 'Unknown').join(', '),
  };
  return plainToInstance(MovieDto, result);
}
