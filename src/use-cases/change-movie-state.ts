import { Movie } from "../entities/movie";
import { MoviesRepository } from "../repositories/movies-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface ChangeMovieStateUseCaseRequest {
    movieId: string
    state: string
}

interface ChangeMovieStateUseCaseResponse {
    movieId: string
    stateChanged: string
}

export class ChangeMovieStateUseCase {
    constructor(private moviesRepository: MoviesRepository) {}

    async execute({
        movieId, 
        state
    }: ChangeMovieStateUseCaseRequest): Promise<ChangeMovieStateUseCaseResponse> {
        const movie = await this.moviesRepository.findMovieById(movieId)

        if (!movie) {
            throw new ResourceNotFoundError()
        }

        movie.state = state

        await this.moviesRepository.save(movie)

        return {
            movieId: movie.id.toString(),
            stateChanged: movie.state
        }
    }
}