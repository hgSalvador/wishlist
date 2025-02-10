import { PrismaClient } from '@prisma/client/extension';
import { MoviesRepository } from '../movies-repository';
import { Movie } from '../../entities/movie';

const prisma = new PrismaClient();

export class PrismaMoviesRepository implements MoviesRepository {
  async findMovieByMovieIdAndUserId(userId: string, movieId: string): Promise<Movie | null> {
    const movie = await prisma.movie.findFirst({
        where: {
          id: movieId,
          userId: userId,
        },
      });
  
      if (!movie) {
        return null;
      }
      return movie
    }


  async create(movie: Movie): Promise<void> {
    await prisma.movie.create({
      data: {
        id: movie.id,
        userId: movie.userId,
        tmdbId: movie.tmdbId,
        title: movie.title,
        synopsis: movie.synopsis,
        releaseDate: movie.releaseDate,
        genre: movie.genre,
        state: movie.state,
        rating: movie.rating,
        recommended: movie.recommended,
      },
    });
  }

  async findMovieById(id: string): Promise<Movie | null> {
    const movie: Movie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      return null;
    }

    return movie
    
  }

  async findMovieByTmdbId(tmdbId: string): Promise<boolean> {
    const movie: Movie = await prisma.movie.findUnique({
      where: { tmdbId },
    });

    return !!movie
  }


  async save(movie: Movie): Promise<void> {
    await prisma.movie.update({
      where: {
        id: movie.id,
      },
      data: {
        userId: movie.userId,
        tmdbId: movie.tmdbId,
        title: movie.title,
        synopsis: movie.synopsis,
        releaseDate: movie.releaseDate,
        genre: movie.genre,
        state: movie.state,
        rating: movie.rating,
        recommended: movie.recommended,
      },
    });
  }

  async getAllMovies(userId: string, { page }: { page: number }): Promise<Movie[]> {
    const movies = await prisma.movie.findMany({
      where: { userId },
      skip: (page - 1) * 20,
      take: 20,
      orderBy: {
        title: 'asc',
      },
    });

    return movies.map(movie => ({
      id: movie.id,
      userId: movie.userId,
      tmdbId: movie.tmdbId,
      title: movie.title,
      synopsis: movie.synopsis,
      releaseDate: movie.releaseDate,
      genre: movie.genre,
      state: movie.state,
      rating: movie.rating,
      recommended: movie.recommended,
    }));
  }
}