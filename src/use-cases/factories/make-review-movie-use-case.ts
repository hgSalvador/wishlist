import { PrismaMoviesRepository } from '../../repositories/prisma/prisma-movies-repository';
import { PrismaLogsRepository } from '../../repositories/prisma/prisma-logs-repository';
import { CreateLogUseCase } from '../create-log';
import { ReviewMovieUseCase } from '../review.movie';

export function makeReviewMovieUseCase() {
  const moviesRepository = new PrismaMoviesRepository();
  const logsRepository = new PrismaLogsRepository();
  const createLogUseCase = new CreateLogUseCase(logsRepository);
  const reviewMovieUseCase = new ReviewMovieUseCase(createLogUseCase, moviesRepository);

  return reviewMovieUseCase;
}