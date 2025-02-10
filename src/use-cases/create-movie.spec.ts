import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryLogsRepository } from "../repositories/in-memory/in-memory-logs-repository";
import { InMemoryTmdbMoviesServices } from "../services/in-memory-tmdb-services/in-memory-tmdb-services";
import { InMemoryMoviesRepository } from "../repositories/in-memory/in-memory-movies-repository";
import { InMemoryMovieHistoryRepository } from "../repositories/in-memory/in-memory-movie-histories-repository";
import { CreateLogUseCase } from "./create-log";
import { CreateMovieUseCase } from "./create-movie";
import { CreateHistoryMovieUseCase } from "./create-history-movie";


let inMemoryMoviesHistoryRepository: InMemoryMovieHistoryRepository
let inMemoryLogsRepository: InMemoryLogsRepository
let inMemoryMoviesRepository: InMemoryMoviesRepository
let tmdbServices: InMemoryTmdbMoviesServices
let createLog: CreateLogUseCase
let createMovieHistory: CreateHistoryMovieUseCase
let sut: CreateMovieUseCase

describe('Create a movie', () => {
    beforeEach(() => {
        inMemoryLogsRepository = new InMemoryLogsRepository()
        createLog = new CreateLogUseCase(inMemoryLogsRepository)
        inMemoryMoviesHistoryRepository = new InMemoryMovieHistoryRepository(),
        inMemoryMoviesRepository = new InMemoryMoviesRepository(),
        createMovieHistory = new CreateHistoryMovieUseCase(inMemoryMoviesRepository, inMemoryMoviesHistoryRepository)
        tmdbServices = new InMemoryTmdbMoviesServices()
        sut = new CreateMovieUseCase(createLog, createMovieHistory, inMemoryMoviesRepository, tmdbServices)

    })

    it('should be able to register', async () => {
        await sut.execute(
            { 
                userId: 'user-01',
                movieName: 'Interstellar',
            },
            {
                protocol: 'HTTP',
                endpoint: '/movies',
                method: 'POST',
                statusCode: 200
            }

        )
    
        expect(inMemoryMoviesRepository.items[0].title).toBe('Interstellar')
        expect(inMemoryMoviesRepository.items[0].state).toBe('To watch')
      })
})