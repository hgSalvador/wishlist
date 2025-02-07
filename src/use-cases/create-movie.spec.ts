import { UniqueEntityID } from "../entities/unique.entity-id";
import { CreateMovieUseCase } from "./create-movie";
import { InMemoryTmdbMoviesServices } from "../services/in-memory-tmdb-services/in-memory-tmdb-services";
import { InMemoryMoviesRepository } from "../repositories/in-memory/in-memory-movies-repository";
import { describe, expect, it, beforeEach } from "vitest";

let inMemoryMoviesRepository: InMemoryMoviesRepository
let itmdbServices: InMemoryTmdbMoviesServices
let sut: CreateMovieUseCase

describe('Create movie', () => {
    beforeEach(() => {
        inMemoryMoviesRepository = new InMemoryMoviesRepository(),
        itmdbServices = new InMemoryTmdbMoviesServices()
        sut = new CreateMovieUseCase(inMemoryMoviesRepository, itmdbServices)
    })

    it('should be able to register', async () => {
        const { movie } = await sut.execute({
            userId: 'user-01',
            movieName: 'Interstellar'
        })

        console.log(movie)
    
        expect(inMemoryMoviesRepository.items[0].title).toBe('Interstellar')
      })
})