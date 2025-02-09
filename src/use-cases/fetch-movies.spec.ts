import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryMoviesRepository } from "../repositories/in-memory/in-memory-movies-repository";
import { FetchMoviesUseCase } from "./fetch-movies";
import { TmdbMoviesServicesSuccesResponse } from "../services/tmdb-services";
import { Movie } from "../entities/movie";
import { UniqueEntityID } from "../entities/unique.entity-id";
import { ResourceNotFoundError } from "./errors/resource-not-found";

let validMoviesTmdb: TmdbMoviesServicesSuccesResponse[] = []
let movies: Movie[]
let inMemoryMoviesRepository: InMemoryMoviesRepository
let sut: FetchMoviesUseCase

describe('List movies', () => {
    beforeEach(async () => {
        inMemoryMoviesRepository = new InMemoryMoviesRepository();
        sut = new FetchMoviesUseCase(inMemoryMoviesRepository);

        validMoviesTmdb = Array.from({ length: 22 }, (_, index) => ({
            metaData: {
                protocol: 'HTTP',
                endpoint: 'tmdb.api-example/searchMovie',
                method: 'GET',
                statusCode: 200,
                timeStamp: new Date()
            },
            tmdbId: `movie-${index + 1}`,
            title: `Movie ${index + 1}`,
            synopsis: `Synopsis for movie ${index + 1}`,
            releaseDate: '2022-01-01', 
            genre: `Genre-${index + 1}`,
            state: 'Available',
            rating: 7,
            recommended: index % 2 === 0, 
        }));

        movies = validMoviesTmdb.map((movie) => {
            return Movie.create({
                userId: new UniqueEntityID('user-01'),
                tmdbId: new UniqueEntityID(movie.tmdbId.toString()),
                title: movie.title,
                synopsis: movie.synopsis,
                releaseDate: movie.releaseDate,
                genre: movie.genre,
                state: 'To watch',
                rating: 1,
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

    it('should be able to not found movies', async ()=> {
        await expect(sut.execute({             
            userId: 'user-02',
            page: 1 
        })).rejects.toThrowError(ResourceNotFoundError)
    })
});