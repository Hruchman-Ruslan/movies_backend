import { Controller, Get, Query } from '@nestjs/common';

import { MoviesService } from '@app/movies/movies.service';
import { PaginationDto } from '@app/movies/dto/pagination.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('popular')
  getPopularMovies(@Query() { page, posterSize }: PaginationDto) {
    return this.moviesService.getPopularMovies(page, posterSize);
  }

  @Get('now_playing')
  getNowPlayingMovies(@Query() { page, posterSize }: PaginationDto) {
    return this.moviesService.getNowPlayingMovies(page, posterSize);
  }

  @Get('top_rated')
  getTopRatingMovies(@Query() { page, posterSize }: PaginationDto) {
    return this.moviesService.getTopRatingMovies(page, posterSize);
  }

  @Get('upcoming')
  getUpcomingMovies(@Query() { page, backdropSize }: PaginationDto) {
    return this.moviesService.getUpcomingMovies(page, backdropSize);
  }
}
