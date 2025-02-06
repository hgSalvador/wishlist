import { UniqueEntityID } from "../entities/unique.entity-id";
import { CreateMovieUseCase } from "./create-movie";
import { InMemoryMoviesRepository } from "../test/repositories/in-memory-movies-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { ItmdbMoviesServices } from "../services/itmdb-services";


let inMemoryMoviesRepository: InMemoryMoviesRepository
let itmdbServices: ItmdbMoviesServices
let sut: CreateMovieUseCase

describe('Create movie', () => {
    beforeEach(() => {
        inMemoryMoviesRepository = new InMemoryMoviesRepository(),
        
        sut = new CreateMovieUseCase(inMemoryMoviesRepository)
    })
})