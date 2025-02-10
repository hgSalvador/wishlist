import { describe, expect, it, beforeEach } from "vitest";
import { UniqueEntityID } from "../entities/unique.entity-id";
import { Movie } from "../entities/movie";
import { InMemoryMoviesRepository } from "../repositories/in-memory/in-memory-movies-repository";
import { ReviewMovieUseCase } from "./review.movie";
import { InvalidRatingMovie } from "./errors/invalid-rating-movie";
import { CreateLogUseCase } from "./create-log";
import { InMemoryLogsRepository } from "../repositories/in-memory/in-memory-logs-repository";

let movie: Movie

let inMemoryLogsRepository: InMemoryLogsRepository
let inMemoryMoviesRepository: InMemoryMoviesRepository
let createLog: CreateLogUseCase
let sut: ReviewMovieUseCase


describe('Rate the movie', () => {
    beforeEach(async () => {
        inMemoryLogsRepository = new InMemoryLogsRepository()
        createLog = new CreateLogUseCase(inMemoryLogsRepository)
        inMemoryMoviesRepository = new InMemoryMoviesRepository()
        sut = new ReviewMovieUseCase(createLog, inMemoryMoviesRepository)

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

    it('should be able to give a rating for movie', async () => {
        const result = await sut.execute({
            userId: 'user-01',
            movieId: movie.id.toString(),
            rating: 5
        },
        {
            protocol: 'HTTP',
            endpoint: '/movies',
            method: 'PUT',
            statusCode: 203
        }
    )

        expect(inMemoryLogsRepository.items[0].sourceUniqueId).toEqual(result.movieId)
        expect(result.rating).toEqual(5)
    })

    it('should not to be able to give a rating more than five', async ()=> {
        await expect(sut.execute({             
            userId: 'user-01',
            movieId: movie.id.toString(),
            rating: 6 
        },
        {
            protocol: 'HTTP',
            endpoint: '/movies',
            method: 'PUT',
            statusCode: 400
        }
        )).rejects.toThrowError(InvalidRatingMovie)

        expect(inMemoryLogsRepository.items[0].statusCode).toEqual(400)
    })
})
