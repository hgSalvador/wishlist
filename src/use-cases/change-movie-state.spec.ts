import { describe, expect, it, beforeEach } from "vitest";
import { Movie } from "../entities/movie";
import { UniqueEntityID } from "../entities/unique.entity-id";
import { InMemoryLogsRepository } from "../repositories/in-memory/in-memory-logs-repository";
import { InMemoryMovieHistoryRepository } from "../repositories/in-memory/in-memory-movie-histories-repository";
import { InMemoryMoviesRepository } from "../repositories/in-memory/in-memory-movies-repository";
import { CreateLogUseCase } from "./create-log";
import { ChangeMovieStateUseCase } from "./change-movie-state";
import { CreateHistoryMovieUseCase } from "../use-cases/create-history-movie"
import { InvalidStateTransitionError } from "./errors/invalid-movie-state";


let movie: Movie
let inMemoryMovieHistoryRepository: InMemoryMovieHistoryRepository
let inMemoryLogsRepository: InMemoryLogsRepository
let inMemoryMoviesRepository: InMemoryMoviesRepository
let createLog: CreateLogUseCase
let createMovieHistory: CreateHistoryMovieUseCase
let sut: ChangeMovieStateUseCase


describe('Change movie state', () => {
    beforeEach(async () => {
        inMemoryLogsRepository = new InMemoryLogsRepository()
        inMemoryMovieHistoryRepository = new InMemoryMovieHistoryRepository()
        inMemoryMoviesRepository = new InMemoryMoviesRepository()
        createMovieHistory = new CreateHistoryMovieUseCase(inMemoryMoviesRepository, inMemoryMovieHistoryRepository)
        createLog = new CreateLogUseCase(inMemoryLogsRepository)
        sut = new ChangeMovieStateUseCase(createLog, createMovieHistory, inMemoryMoviesRepository)


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

    it('should not be able to change a movie state to "Reviewed" if it is not "Watched"', async () => {
        await expect(sut.execute({
            userId: 'user-01',
            movieId: movie.id.toString(),
            state: 'Reviewed'
        },
        {
            protocol: 'HTTP',
            endpoint: '/movies',
            method: 'PUT',
            statusCode: 203
        })).rejects.toThrowError(InvalidStateTransitionError);
    });

    it('should not be able to change a movie state to "Recommended" if it is not "Reviewed"', async () => {
        await expect(sut.execute({
            userId: 'user-01',
            movieId: movie.id.toString(),
            state: 'Recommended'
        },
        {
            protocol: 'HTTP',
            endpoint: '/movies',
            method: 'PUT',
            statusCode: 203
        })).rejects.toThrowError(InvalidStateTransitionError);
    });

    it('should not be able to change a movie state to "Not Recommended" if it is not "Reviewed"', async () => {
        await expect(sut.execute({
            userId: 'user-01',
            movieId: movie.id.toString(),
            state: 'Not Recommended'
        },
        {
            protocol: 'HTTP',
            endpoint: '/movies',
            method: 'PUT',
            statusCode: 203
        })).rejects.toThrowError(InvalidStateTransitionError);
    });
})