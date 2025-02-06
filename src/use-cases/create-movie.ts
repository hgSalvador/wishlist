import { UniqueEntityID } from "../entities/unique.entity-id";
import { Movie } from "../entities/movie";
import { MoviesRepository } from "../repositories/in-memory/in-memory-movies-repository";
import { ItmdbMoviesServices } from "../services/tmdb-services";


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
        private itmdbServices: ItmdbMoviesServices
    ) {}

    async execute({
        userId,
        movieName
    }: CreateMovieUseCaseRequest): Promise<CreateMovietUseCaseResponse> {
        const isValidMovie = await this.itmdbServices.getMovieByName(movieName)

        if (!isValidMovie) {
            throw new Error('Movie not found, please try again')
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