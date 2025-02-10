import { Movie } from "../entities/movie";
import { MoviesRepository } from "../repositories/movies-repository";
import { CreateLogUseCase } from "./create-log";
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

interface MetaData {
    protocol: string;
    endpoint: string;
    method: string;
    statusCode: number;
}


export class ChangeMovieStateUseCase {
    constructor(
        private createLog: CreateLogUseCase,
        private moviesRepository: MoviesRepository
    
    ) {}

    async execute(
        { userId, movieId, state }: ChangeMovieStateUseCaseRequest,
        { protocol, endpoint, method, statusCode }: MetaData
    
    ): Promise<ChangeMovieStateUseCaseResponse> {
        const movie = await this.moviesRepository.findMovieByMovieIdAndUserId(userId, movieId)

        if (!movie) {
            throw new ResourceNotFoundError()
        }

        const oldState = movie.state

        movie.state = state

        await this.moviesRepository.save(movie)

        await this.createLog.execute({
            protocol,
            endpoint,
            method,
            statusCode,
            sourceUniqueId: movie.id.toString()
        })


        return {
            movieId: movie.id.toString(),
            previousState: oldState,
            currentState: movie.state
        }
    }
}