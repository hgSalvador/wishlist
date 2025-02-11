import { PrismaClient } from '@prisma/client';
import { MoviesRepository } from '../movies-repository';
import { Movie } from '../../entities/movie';
import { UniqueEntityID } from '../../entities/unique.entity-id';

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

    return Movie.create(
      {
        userId: new UniqueEntityID(movie.userId),
        tmdbId: new UniqueEntityID(movie.tmdbId),
        title: movie.title,
        synopsis: movie.synopsis,
        releaseDate: movie.releaseDate,
        genre: movie.genre.join(', '),
        state: movie.state,
        rating: movie.rating,
        recommended: movie.recommended,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
      },
      new UniqueEntityID(movie.id)
    );
  }

  async create(movie: Movie): Promise<void> {
    await prisma.movie.create({
      data: {
        id: movie.id.toString(),
        userId: movie.userId.toString(),
        tmdbId: movie.tmdbId.toString(),
        title: movie.title,
        synopsis: movie.synopsis,
        releaseDate: movie.releaseDate,
        genre: movie.genre.toString(),
        state: movie.state,
        rating: movie.rating,
        recommended: movie.recommended,
      },
    });
  }

  async findMovieById(id: string): Promise<Movie | null> {
    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      return null;
    }

    return  Movie.create({
      userId: new UniqueEntityID(movie.userId),
      tmdbId: new UniqueEntityID(movie.tmdbId),
      title: movie.title,
      synopsis: movie.synopsis,
      releaseDate: movie.releaseDate,
      genre: movie.genre,
      state: movie.state,
      rating: movie.rating,
      recommended: movie.recommended,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    },
    new UniqueEntityID(movie.id));
  }

  async findMovieByTmdbId(tmdbId: string): Promise<boolean> {
    const movie = await prisma.movie.findFirst({
      where: { tmdbId },
    });

    return !!movie;
  }

  async save(movie: Movie): Promise<void> {
    await prisma.movie.update({
      where: {
        id: movie.id.toString(),
      },
      data: {
        userId: movie.userId.toString(),
        tmdbId: movie.tmdbId.toString(),
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

    return movies.map(movie => 
      Movie.create({
        userId: new UniqueEntityID(movie.userId),
        tmdbId: new UniqueEntityID(movie.tmdbId),
        title: movie.title,
        synopsis: movie.synopsis,
        releaseDate: movie.releaseDate,
        genre: movie.genre,
        state: movie.state,
        rating: movie.rating,
        recommended: movie.recommended,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
      }, new UniqueEntityID(movie.id))
    );
  }
}