import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryTmdbMoviesServices } from "../services/in-memory-tmdb-services/in-memory-tmdb-services";
import { InMemoryMoviesRepository } from "../repositories/in-memory/in-memory-movies-repository";
import { CreateMovieUseCase } from "./create-movie";

let inMemoryMoviesRepository: InMemoryMoviesRepository
let tmdbServices: InMemoryTmdbMoviesServices
let sut: CreateMovieUseCase

describe('Create a movie', () => {
    beforeEach(() => {
        inMemoryMoviesRepository = new InMemoryMoviesRepository(),
        tmdbServices = new InMemoryTmdbMoviesServices()
        sut = new CreateMovieUseCase(inMemoryMoviesRepository, tmdbServices)
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