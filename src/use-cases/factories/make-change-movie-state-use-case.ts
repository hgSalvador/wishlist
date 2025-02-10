import { PrismaMoviesRepository } from '../../repositories/prisma/prisma-movies-repository';
import { PrismaLogsRepository } from '../../repositories/prisma/prisma-logs-repository';
import { PrismaMovieHistoriesRepository } from '../../repositories/prisma/prisma-movie-histories-repository';
import { ChangeMovieStateUseCase } from '../change-movie-state';
import { CreateLogUseCase } from '../create-log';
import { CreateHistoryMovieUseCase } from '../create-history-movie';

export function makeChangeMovieStateUseCase() {
  const moviesRepository = new PrismaMoviesRepository();
  const logsRepository = new PrismaLogsRepository();
  const movieHistoriesRepository = new PrismaMovieHistoriesRepository();
  const createLogUseCase = new CreateLogUseCase(logsRepository);
  const createHistoryMovieUseCase = new CreateHistoryMovieUseCase(moviesRepository, movieHistoriesRepository);
  const changeMovieStateUseCase = new ChangeMovieStateUseCase(createLogUseCase, createHistoryMovieUseCase, moviesRepository);

  return changeMovieStateUseCase;
}