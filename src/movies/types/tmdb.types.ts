export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbGenresResponse {
  genres: TmdbGenre[];
}

export interface TmdbMovie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
  genre_ids: number[];
}

export interface TmdbPopularMoviesResponse {
  results: TmdbMovie[];
}
