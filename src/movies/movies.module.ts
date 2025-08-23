import { Module } from '@nestjs/common';

import { MoviesController } from '@app/movies/movies.controller';
import { MoviesService } from '@app/movies/movies.service';

@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
