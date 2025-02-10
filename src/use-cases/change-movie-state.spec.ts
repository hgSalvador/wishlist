import { describe, expect, it, beforeEach } from "vitest";
import { Movie } from "../entities/movie";
import { UniqueEntityID } from "../entities/unique.entity-id";
import { InMemoryLogsRepository } from "../repositories/in-memory/in-memory-logs-repository";
import { InMemoryMoviesRepository } from "../repositories/in-memory/in-memory-movies-repository";
import { CreateLogUseCase } from "./create-log";
import { ChangeMovieStateUseCase } from "./change-movie-state";

let movie: Movie

let inMemoryLogsRepository: InMemoryLogsRepository
let inMemoryMoviesRepository: InMemoryMoviesRepository
let createLog: CreateLogUseCase
let sut: ChangeMovieStateUseCase


describe('Change movie state', () => {
    beforeEach(async () => {
        inMemoryLogsRepository = new InMemoryLogsRepository()
        createLog = new CreateLogUseCase(inMemoryLogsRepository)
        inMemoryMoviesRepository = new InMemoryMoviesRepository()
        sut = new ChangeMovieStateUseCase(createLog, inMemoryMoviesRepository)


        movie = Movie.create({
            userId: new UniqueEntityID('user-01'),
            tmdbId: new UniqueEntityID('tmdb-01'),
            title: 'Movie 01',
            synopsis: 'Example synopsis',
            releaseDate: '2025-01-01',
            genre: 'Drama',
            state: 'To watch',
            rating: 1,
            recommended: true
        })


        await inMemoryMoviesRepository.create(movie)
    })

    it('should be able to change a movie state', async () => {
        const result = await sut.execute({
            userId: 'user-01',
            movieId: movie.id.toString(),
            state: 'Watched'
        },
        {
            protocol: 'HTTP',
            endpoint: '/movies',
            method: 'PUT',
            statusCode: 203
        }
    )

        expect(result.currentState).toEqual('Watched')
    })
})