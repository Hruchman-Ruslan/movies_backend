import { plainToInstance } from 'class-transformer';

import { MovieDto } from '@app/movies/dto/movie.dto';
import { BackdropSize, PosterSize, TmdbMovie } from '@app/types';

import { getTmdbImageUrl } from '@app/utils/tmdb/getTmdbImageUrl';

export function mapMovieToDto(
  {
    id,
    title,
    vote_average,
    poster_path,
    backdrop_path,
    overview,
    release_date,
    genre_ids,
  }: TmdbMovie,
  imageBaseUrl: string,
  posterSize: PosterSize = 'original',
  backdropSize: BackdropSize = 'original',
  genresMap?: Map<number, string>,
): MovieDto {
  return plainToInstance(MovieDto, {
    id,
    title,
    rating: vote_average,
    poster: getTmdbImageUrl(poster_path, imageBaseUrl, posterSize),
    backdrop: getTmdbImageUrl(backdrop_path, imageBaseUrl, backdropSize),
    overview,
    release_date,
    genres: genresMap
      ? genre_ids.map((id) => genresMap.get(id) ?? 'Unknown').join(', ')
      : undefined,
  });
}
