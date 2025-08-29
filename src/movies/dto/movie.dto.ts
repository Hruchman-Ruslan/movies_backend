import { IsString, IsNumber, IsOptional } from 'class-validator';

export class MovieDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsString()
  poster?: string;

  @IsOptional()
  @IsString()
  backdrop?: string;

  @IsOptional()
  @IsString()
  overview?: string;

  @IsOptional()
  @IsString()
  releaseDate?: string;

  @IsOptional()
  @IsString()
  genres?: string;
}
