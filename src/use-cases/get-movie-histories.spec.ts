import { expect, beforeEach, describe, it } from 'vitest';
import { Movie } from '../entities/movie';
import { InMemoryMoviesRepository } from '../repositories/in-memory/in-memory-movies-repository';
import { InMemoryMovieHistoryRepository } from '../repositories/in-memory/in-memory-movie-histories-repository';
import { GetMovieHistoryUseCase } from './get-movie-histories';
import { UniqueEntityID } from '../entities/unique.entity-id';
import { MovieHistory } from '../repositories/history-movies-repository';

let inMemoryMoviesRepository: InMemoryMoviesRepository
let inMemoryMovieHistoryRepository: InMemoryMovieHistoryRepository
let movie: Movie
let movieHistory: MovieHistory
let sut: GetMovieHistoryUseCase

describe('Get a history movie', () => {
    beforeEach(async () => {
        inMemoryMovieHistoryRepository = new InMemoryMovieHistoryRepository()
        inMemoryMoviesRepository = new InMemoryMoviesRepository()
        sut = new GetMovieHistoryUseCase(inMemoryMovieHistoryRepository)

        movie = Movie.create({
            userId: new UniqueEntityID('user-01'),
            tmdbId: new UniqueEntityID('tmdb-01'),
            title: 'Movie-01',
            synopsis: 'Synopsis test',
            releaseDate: '2025-01-01',
            genre: 'Sci-fi',
            state: 'To watch',
            rating: 1,
            recommended: true
        })

        await inMemoryMoviesRepository.create(movie)

        movieHistory = {
            id: 'history-01',
            movieId: movie.id.toString(),
            newState: movie.state,
            createdAt: new Date()
        }

        await inMemoryMovieHistoryRepository.create(movieHistory)
    })

    it('should be able to get a movie history', async() => {
        const result = await sut.execute({
            movieId: movie.id.toString(),
            page: 1
        })

        expect(result.movieHistories).toHaveLength(1)
    })
})