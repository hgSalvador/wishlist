import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryMoviesRepository } from "../repositories/in-memory/in-memory-movies-repository";
import { FetchMoviesUseCase } from "./fetch-movies";
import { TmdbMoviesServicesResponse } from "../services/tmdb-services";
import { Movie } from "../entities/movie";
import { UniqueEntityID } from "../entities/unique.entity-id";



let validMovieTmdb: TmdbMoviesServicesResponse[] = []
let inMemoryMoviesRepository: InMemoryMoviesRepository
let sut: FetchMoviesUseCase

describe('List movies', () => {
    beforeEach(async () => {
        inMemoryMoviesRepository = new InMemoryMoviesRepository();
        sut = new FetchMoviesUseCase(inMemoryMoviesRepository);

        validMovieTmdb = Array.from({ length: 22 }, (_, index) => ({
            tmdbId: `movie-${index + 1}`,
            title: `Movie ${index + 1}`,
            synopsis: `Synopsis for movie ${index + 1}`,
            releaseDate: '2022-01-01', 
            genre: `Genre-${index + 1}`,
            state: 'Available',
            rating: 7,
            recommended: index % 2 === 0, 
        }));

        const movies = validMovieTmdb.map((movie) => {
            return Movie.create({
                userId: new UniqueEntityID('user-01'),
                tmdbId: new UniqueEntityID(movie.tmdbId.toString()),
                title: movie.title,
                synopsis: movie.synopsis,
                releaseDate: movie.releaseDate,
                genre: movie.genre,
                state: movie.state,
                rating: movie.rating,
                recommended: movie.recommended,
            });
        });

        await Promise.all(
            movies.map((movie) => {
                inMemoryMoviesRepository.create(movie)
            })
        );
    });

    it('should be able to get all movies', async () => {
        const result = await sut.execute({
            userId: 'user-01',
            page: 1
        })

        expect(result.movies).toHaveLength(20)
    })

    it('should be able to fetch paginated movies', async () => {
        const result = await sut.execute({
            userId: 'user-01',
            page: 2
        })

        expect(result.movies).toHaveLength(2)
    })
});