import { Movie } from "../entities/movie";
import { MoviesRepository } from "../repositories/movies-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface ChangeMovieStateUseCaseRequest {
    userId: string
    movieId: string
    state: string
}

interface ChangeMovieStateUseCaseResponse {
    movieId: string
    previousState: string
    currentState: string
}

export class ChangeMovieStateUseCase {
    constructor(private moviesRepository: MoviesRepository) {}

    async execute({
        userId,
        movieId, 
        state
    }: ChangeMovieStateUseCaseRequest): Promise<ChangeMovieStateUseCaseResponse> {
        const movie = await this.moviesRepository.findMovieByMovieIdAndUserId(userId, movieId)

        if (!movie) {
            throw new ResourceNotFoundError()
        }

        const oldState = movie.state

        movie.state = state

        await this.moviesRepository.save(movie)

        return {
            movieId: movie.id.toString(),
            previousState: oldState,
            currentState: movie.state
        }
    }
}