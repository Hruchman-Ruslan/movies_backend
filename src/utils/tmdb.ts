import { plainToInstance } from 'class-transformer';

import { MovieDto } from '@app/movies/dto/movie.dto';
import { TmdbMovie, TmdbMoviesResponse } from '@app/movies/types/tmdb.types';

export type MovieType = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';

export async function fetchMovies<T>(
  apiKey: string,
  baseUrl: string,
  type: MovieType,
  page = 1,
): Promise<TmdbMoviesResponse<T>> {
  const res = await fetch(
    `${baseUrl}/movie/${type}?api_key=${apiKey}&language=en-US&page=${page}`,
  );
  if (!res.ok) throw new Error(`Failed to fetch ${type} movies`);
  return res.json();
}

export async function fetchGenres(
  apiKey: string,
  baseUrl: string,
): Promise<Map<number, string>> {
  const res = await fetch(
    `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`,
  );
  if (!res.ok) throw new Error('Failed to fetch genres');

  const { genres }: { genres: { id: number; name: string }[] } =
    await res.json();
  return new Map(genres.map(({ id, name }) => [id, name]));
}

export function mapMovieToDto(
  movie: TmdbMovie,
  imageBaseUrl: string,
  genresMap?: Map<number, string>,
): MovieDto {
  return plainToInstance(MovieDto, {
    id: movie.id,
    title: movie.title,
    rating: movie.vote_average,
    poster: movie.poster_path
      ? `${imageBaseUrl}${movie.poster_path}`
      : undefined,
    backdrop: movie.backdrop_path
      ? `${imageBaseUrl}${movie.backdrop_path}`
      : undefined,
    overview: movie.overview,
    releaseDate: movie.release_date,
    genres: genresMap
      ? movie.genre_ids.map((id) => genresMap.get(id) ?? 'Unknown').join(', ')
      : undefined,
  });
}
