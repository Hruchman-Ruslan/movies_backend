import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

import type { ImageSize } from '@app/types';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsEnum(['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'])
  imageSize?: ImageSize = 'w500';
}
