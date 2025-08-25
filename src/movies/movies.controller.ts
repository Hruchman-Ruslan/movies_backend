import { Controller, Get, Query } from '@nestjs/common';

import { MoviesService } from '@app/movies/movies.service';
import { PaginationDto } from '@app/movies/dto/pagination.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('popular')
  getPopularMovies(@Query() { page }: PaginationDto) {
    return this.moviesService.getPopularMovies(page);
  }
}
