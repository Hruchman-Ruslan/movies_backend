import { plainToInstance } from 'class-transformer';

import { MovieDto } from '@app/movies/dto/movie.dto';
import { TmdbMovie } from '@app/types';

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
  imageSize: string = 'w500',
  genresMap?: Map<number, string>,
): MovieDto {
  return plainToInstance(MovieDto, {
    id,
    title,
    rating: vote_average,
    poster: getTmdbImageUrl(poster_path, imageBaseUrl, imageSize),
    backdrop: getTmdbImageUrl(backdrop_path, imageBaseUrl, imageSize),
    overview,
    release_date,
    genres: genresMap
      ? genre_ids.map((id) => genresMap.get(id) ?? 'Unknown').join(', ')
      : undefined,
  });
}
