import { Movie } from "../entities/movie";
import { MoviesRepository } from "../repositories/movies-repository";
import { CreateHistoryMovieUseCase } from "./create-history-movie";
import { CreateLogUseCase } from "./create-log";
import { InvalidStateTransitionError } from "./errors/invalid-movie-state";
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
        private movieHistory: CreateHistoryMovieUseCase,
        private moviesRepository: MoviesRepository
    
    ) {}

    async execute(
        { userId, movieId, state }: ChangeMovieStateUseCaseRequest,
        { protocol, endpoint, method, statusCode }: MetaData
    
    ): Promise<ChangeMovieStateUseCaseResponse> {
        const movie = await this.moviesRepository.findMovieByMovieIdAndUserId(userId, movieId)

        if (!movie) {
            await this.createLog.execute({
                protocol,
                endpoint,
                method,
                statusCode
            })

            throw new ResourceNotFoundError()
        }

        const oldState = movie.state

        if (state === 'Reviewed' && oldState !== 'Watched') {
            throw new InvalidStateTransitionError()
        }

        if ((state === 'Recommended' || state === 'Not Recommended') && oldState !== 'Reviewed') {
            throw new InvalidStateTransitionError()
        }

        movie.state = state

        await this.moviesRepository.save(movie)

        await this.createLog.execute({
            protocol,
            endpoint,
            method,
            statusCode,
            sourceUniqueId: movie.id.toString()
        })

        await this.movieHistory.execute({
            movieId: movie.id.toString(),
            newState: movie.state
        })

        return {
            movieId: movie.id.toString(),
            previousState: oldState,
            currentState: movie.state
        }
    }
}