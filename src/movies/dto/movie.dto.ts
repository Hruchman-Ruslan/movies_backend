import { IsString, IsNumber, IsOptional } from 'class-validator';

export class MovieDto {
  @IsString()
  title: string;

  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  poster: string | null;

  @IsString()
  genres: string;
}
