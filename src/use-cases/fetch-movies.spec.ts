import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryTmdbMoviesServices } from "../services/in-memory-tmdb-services/in-memory-tmdb-services";
import { InMemoryMoviesRepository } from "../repositories/in-memory/in-memory-movies-repository";
import { FetchMoviesUseCase } from "./fetch-movies";


let validMovisTmdb = []
let inMemoryTmdbMoviesServices: InMemoryTmdbMoviesServices
let inMemoryMoviesRepository: InMemoryMoviesRepository
let sut: FetchMoviesUseCase

describe('List movies', () => {
    beforeEach(() => {
        inMemoryTmdbMoviesServices = new InMemoryTmdbMoviesServices(),
        inMemoryMoviesRepository = new InMemoryMoviesRepository(),
        sut = new FetchMoviesUseCase(inMemoryMoviesRepository),

        


    })
})