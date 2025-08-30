import { TmdbList, TmdbMoviesResponse } from '@app/types';

export async function fetchMovies<T>(
  apiKey: string,
  baseUrl: string,
  type: TmdbList,
  page = 1,
): Promise<TmdbMoviesResponse<T>> {
  const res = await fetch(
    `${baseUrl}/movie/${type}?api_key=${apiKey}&language=en-US&page=${page}`,
  );
  if (!res.ok) throw new Error(`Failed to fetch ${type} movies`);
  return res.json();
}
