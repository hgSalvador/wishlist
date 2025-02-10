import { PrismaMovieHistoriesRepository } from '../../repositories/prisma/prisma-movie-histories-repository';
import { GetMovieHistoryUseCase } from '../get-movie-histories';

export function makeGetMovieHistoryUseCase() {
  const movieHistoriesRepository = new PrismaMovieHistoriesRepository();
  const getMovieHistoryUseCase = new GetMovieHistoryUseCase(movieHistoriesRepository);

  return getMovieHistoryUseCase;
}