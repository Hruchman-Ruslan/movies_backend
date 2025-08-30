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
