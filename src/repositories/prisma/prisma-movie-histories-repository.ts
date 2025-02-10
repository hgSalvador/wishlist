import { PrismaClient } from '@prisma/client/extension';
import { MovieHistoryRepository, MovieHistory } from '../history-movies-repository';
import { PaginationParams } from '../pagination-params';

const prisma = new PrismaClient();

export class PrismaMovieHistoriesRepository implements MovieHistoryRepository {
  async findManyMovieHistoriesByMovieId(movieId: string, { page }: PaginationParams): Promise<MovieHistory[] | null> {
    const movieHistories = await prisma.movieHistory.findMany({
      where: { movieId },
      skip: (page - 1) * 20,
      take: 20,
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (movieHistories.length === 0) {
      return null;
    }

    return movieHistories.map(movieHistory => ({
      id: movieHistory.id,
      movieId: movieHistory.movieId,
      newState: movieHistory.newState,
      createdAt: movieHistory.createdAt,
      updatedAt: movieHistory.updatedAt,
    }));
  }

  async create(movieHistory: MovieHistory): Promise<void> {
    await prisma.movieHistory.create({
      data: {
        id: movieHistory.id,
        movieId: movieHistory.movieId,
        newState: movieHistory.newState,
        createdAt: movieHistory.createdAt,
        updatedAt: movieHistory.updatedAt,
      },
    });
  }

  async save(movieHistory: MovieHistory): Promise<void> {
    await prisma.movieHistory.update({
      where: {
        id: movieHistory.id,
      },
      data: {
        movieId: movieHistory.movieId,
        newState: movieHistory.newState,
        createdAt: movieHistory.createdAt,
        updatedAt: movieHistory.updatedAt,
      },
    });
  }
}