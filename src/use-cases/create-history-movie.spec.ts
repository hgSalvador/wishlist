import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryMoviesRepository } from "../repositories/in-memory/in-memory-movies-repository";
import { InMemoryMovieHistoryRepository } from "../repositories/in-memory/in-memory-movie-history-repository";
import { CreateHistoryMovieUseCase } from "./create-history-movie";
import { Movie } from "../entities/movie";
import { UniqueEntityID } from "../entities/unique.entity-id";


let movie: Movie
let inMemoryMoviesRepository: InMemoryMoviesRepository
let inMemoryMovieHistoryRepository: InMemoryMovieHistoryRepository
let sut: CreateHistoryMovieUseCase

describe('Create a movie history', () => {
    beforeEach(async () => {
        inMemoryMoviesRepository = new InMemoryMoviesRepository(),
        inMemoryMovieHistoryRepository = new InMemoryMovieHistoryRepository(),
        sut = new CreateHistoryMovieUseCase(inMemoryMoviesRepository, inMemoryMovieHistoryRepository)

        movie = Movie.create({
            userId: new UniqueEntityID('user-01'),
            tmdbId: new UniqueEntityID('movie-01'),
            title: 'Movie 01',
            synopsis: 'Movie synopsis example',
            releaseDate: '2025-01-01',
            genre: 'Sci-fi',
            state: 'To watch',
            rating: 1,
            recommended: true,
        })

        await inMemoryMoviesRepository.create(movie)
    })

    it('should be able to create a history movie', async () => {
        const { movieHistory } = await sut.execute({
            movieId: movie.id.toString(),
            newState: movie.state
        })

        expect(inMemoryMovieHistoryRepository.items[0].id).toEqual(movieHistory.id)
        expect(inMemoryMovieHistoryRepository.items[0].newState).toEqual(movie.state)
    })
})