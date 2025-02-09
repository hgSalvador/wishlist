import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryLogsRepository } from "../repositories/in-memory/in-memory-logs-repository";
import { InMemoryTmdbMoviesServices } from "../services/in-memory-tmdb-services/in-memory-tmdb-services";
import { InMemoryMoviesRepository } from "../repositories/in-memory/in-memory-movies-repository";
import { CreateLogUseCase } from "./create-log";
import { CreateMovieUseCase } from "./create-movie";

let inMemoryLogsRepository: InMemoryLogsRepository
let inMemoryMoviesRepository: InMemoryMoviesRepository
let tmdbServices: InMemoryTmdbMoviesServices
let createLog: CreateLogUseCase
let sut: CreateMovieUseCase

describe('Create a movie', () => {
    beforeEach(() => {
        inMemoryLogsRepository = new InMemoryLogsRepository()
        createLog = new CreateLogUseCase(inMemoryLogsRepository)
        inMemoryMoviesRepository = new InMemoryMoviesRepository(),
        tmdbServices = new InMemoryTmdbMoviesServices()
        sut = new CreateMovieUseCase(createLog, inMemoryMoviesRepository, tmdbServices)
    })

    it('should be able to register', async () => {
        await sut.execute({ 
            userId: 'user-01',
            movieName: 'Interstellar'
        })
    
        expect(inMemoryMoviesRepository.items[0].title).toBe('Interstellar')
        expect(inMemoryMoviesRepository.items[0].state).toBe('To watch')
      })
})