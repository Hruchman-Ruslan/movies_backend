export function getTmdbImageUrl(
  path?: string,
  imageBaseUrl?: string,
  size: string = 'w500',
): string | undefined {
  if (!path) return undefined;
  return `${imageBaseUrl}${size}${path}`;
}
