import { PrismaMoviesRepository } from '../../repositories/prisma/prisma-movies-repository';
import { PrismaMovieHistoriesRepository } from '../../repositories/prisma/prisma-movie-histories-repository';
import { CreateHistoryMovieUseCase } from '../create-history-movie';

export function makeCreateHistoryMovieUseCase() {
  const moviesRepository = new PrismaMoviesRepository();
  const movieHistoriesRepository = new PrismaMovieHistoriesRepository();
  const createHistoryMovieUseCase = new CreateHistoryMovieUseCase(moviesRepository, movieHistoriesRepository);

  return createHistoryMovieUseCase;
}