import { expect, beforeEach, describe, it } from 'vitest';
import { Movie } from '../entities/movie';
import { TmdbMoviesServicesSuccesResponse } from '../services/tmdb-services';
import { InMemoryMoviesRepository } from '../repositories/in-memory/in-memory-movies-repository';
import { GetMovieUseCase } from './get-movie';
import { UniqueEntityID } from '../entities/unique.entity-id';
import { ResourceNotFoundError } from './errors/resource-not-found';

let validMovieTmdb: TmdbMoviesServicesSuccesResponse[] = []
let movie: Movie
let inMemoryMoviesRepository: InMemoryMoviesRepository
let sut: GetMovieUseCase

describe('Get a movie By Id', () => {
    beforeEach(async () => {
        inMemoryMoviesRepository = new InMemoryMoviesRepository()
        sut = new GetMovieUseCase(inMemoryMoviesRepository)

        validMovieTmdb = [
            {
                tmdbId: 'movie-01',
                title: 'Movie 01',
                synopsis: 'Synopsis for movie 01',
                releaseDate: '2022-01-01',
                genre: 'Genre-01',
                recommended: true,
                metaData: {
                    protocol: 'HTTP',
                    endpoint: 'tmd.api-example/movie',
                    method: 'GET',
                    statusCode: 200,
                    timeStamp: new Date()
                }
            }
        ]

        movie = Movie.create({
            userId: new UniqueEntityID('user-01'),
            tmdbId: new UniqueEntityID(validMovieTmdb[0].tmdbId),
            title: validMovieTmdb[0].title,
            synopsis: validMovieTmdb[0].synopsis,
            releaseDate: validMovieTmdb[0].releaseDate,
            genre: validMovieTmdb[0].genre,
            state: 'To watch',
            rating: 1,
            recommended: validMovieTmdb[0].recommended
        })

        await inMemoryMoviesRepository.create(movie)
    })

    it('it should be able to get a movie by id', async () => {
        const result = await sut.execute({
            movieId: movie.id.toString()
        })
        
        expect(result.movie.title).toEqual('Movie 01')
    })

    it('it should be able return no movie', async () => {
        const movieId = 'movie-02'
        await expect(sut.execute({ movieId })).rejects.toThrowError(ResourceNotFoundError)
    })
})