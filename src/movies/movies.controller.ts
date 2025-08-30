import { Controller, Get, Query } from '@nestjs/common';

import { MoviesService } from '@app/movies/movies.service';
import { PaginationDto } from '@app/movies/dto/pagination.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('popular')
  getPopularMovies(@Query() { page, imageSize }: PaginationDto) {
    return this.moviesService.getPopularMovies(page, imageSize);
  }

  @Get('now_playing')
  getNowPlayingMovies(@Query() { page, imageSize }: PaginationDto) {
    return this.moviesService.getNowPlayingMovies(page, imageSize);
  }

  @Get('top_rated')
  getTopRatingMovies(@Query() { page, imageSize }: PaginationDto) {
    return this.moviesService.getTopRatingMovies(page, imageSize);
  }

  @Get('upcoming')
  getUpcomingMovies(@Query() { page, imageSize }: PaginationDto) {
    return this.moviesService.getUpcomingMovies(page, imageSize);
  }
}
