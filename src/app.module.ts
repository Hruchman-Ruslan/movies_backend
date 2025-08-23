import { Module } from '@nestjs/common';

import { MoviesModule } from '@app/movies/movies.module';

@Module({
  imports: [MoviesModule],
})
export class AppModule {}
