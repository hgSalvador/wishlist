import { PrismaMoviesRepository } from '../../repositories/prisma/prisma-movies-repository';
import { PrismaLogsRepository } from '../../repositories/prisma/prisma-logs-repository';
import { PrismaMovieHistoriesRepository } from '../../repositories/prisma/prisma-movie-histories-repository';
import { CreateLogUseCase } from '../create-log';
import { CreateHistoryMovieUseCase } from '../create-history-movie';
import { TmdbMoviesServices } from '../../services/api/api-tmdb-movies-service';
import { CreateMovieUseCase } from '../create-movie';

export function makeCreateMovieUseCase() {
  const moviesRepository = new PrismaMoviesRepository();
  const logsRepository = new PrismaLogsRepository();
  const movieHistoriesRepository = new PrismaMovieHistoriesRepository();
  const createLogUseCase = new CreateLogUseCase(logsRepository);
  const createHistoryMovieUseCase = new CreateHistoryMovieUseCase(moviesRepository, movieHistoriesRepository);
  const tmdbServices = new TmdbMoviesServices();
  const createMovieUseCase = new CreateMovieUseCase(createLogUseCase, createHistoryMovieUseCase, moviesRepository, tmdbServices);

  return createMovieUseCase;
}