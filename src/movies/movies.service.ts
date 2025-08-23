import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
  getPopularMovies() {
    return { title: 'Popular Movie' };
  }
}
