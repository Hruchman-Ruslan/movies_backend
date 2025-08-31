import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

import type { BackdropSize, PosterSize } from '@app/types';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsEnum(['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'])
  posterSize?: PosterSize = 'original';

  @IsOptional()
  @IsEnum(['w300', 'w780', 'w1280', 'original'])
  backdropSize?: BackdropSize = 'original';
}
