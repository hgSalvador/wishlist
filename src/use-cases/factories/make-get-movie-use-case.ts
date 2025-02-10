import { PrismaMoviesRepository } from '../../repositories/prisma/prisma-movies-repository';
import { GetMovieUseCase } from '../get-movie';

export function makeGetMovieUseCase() {
  const moviesRepository = new PrismaMoviesRepository();
  const getMovieUseCase = new GetMovieUseCase(moviesRepository);

  return getMovieUseCase;
}