import { UniqueEntityID } from "../entities/unique.entity-id";
import { Movie } from "../entities/movie";
import { MoviesRepository } from "../repositories/movies-repository";
import { TmdbMoviesServices } from "../services/tmdb-services";
import { MovieNotFoundError } from "./errors/movie-not-found";
import { ResourceNotFoundError } from "./errors/resource-not-found";


interface CreateMovieUseCaseRequest {
    userId: string
    movieName: string
}

interface CreateMovietUseCaseResponse {
    movie: Movie
}

export class CreateMovieUseCase {
    constructor(
        private moviesRepository: MoviesRepository,
        private tmdbServices: TmdbMoviesServices
    ) {}

    async execute({
        userId,
        movieName
    }: CreateMovieUseCaseRequest): Promise<CreateMovietUseCaseResponse> {
        const isValidMovie = await this.tmdbServices.findMovieByName(movieName)

        if (!isValidMovie) {
            throw new MovieNotFoundError()
        }

        const isValidMovieOnBase = await this.moviesRepository.findMovieByTmdbId(isValidMovie.tmdbId)

        if (!isValidMovieOnBase) {
            throw new ResourceNotFoundError()
        }

        const movie = Movie.create({
            userId: new UniqueEntityID(userId),
            tmdbId: new UniqueEntityID(isValidMovie.tmdbId),
            title: isValidMovie.title,
            synopsis: isValidMovie.synopsis,
            releaseDate: isValidMovie.releaseDate,
            genre: isValidMovie.genre,
            state: isValidMovie.state,
            rating: isValidMovie.rating,
            recommended: isValidMovie.recommended,     
        })

        await this.moviesRepository.create(movie)

        return  {
            movie
        }
    }
}