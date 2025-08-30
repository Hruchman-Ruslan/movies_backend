export type TmdbList = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';

export type ImageSize =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'original';

export interface TmdbMovie {
  id: number;
  title: string;
  vote_average: number;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  genre_ids: number[];
}

export interface TmdbMoviesResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
