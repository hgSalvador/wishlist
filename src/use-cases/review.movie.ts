import { Movie } from "../entities/movie";
import { MoviesRepository } from "../repositories/movies-repository";
import { CreateLogUseCase } from "./create-log";
import { InvalidRatingMovie } from "./errors/invalid-rating-movie";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface ReviewMovieUseCaseRequest {
    userId: string
    movieId: string
    rating: number
}

interface ReviewMovieUseCaseResponse {
    movieId: string
    rating: number
}

interface MetaData {
    protocol: string;
    endpoint: string;
    method: string;
    statusCode: number;
}

export class ReviewMovieUseCase {
    constructor(
        private createLog: CreateLogUseCase,
        private moviesRepository: MoviesRepository
    
    ) {}

    async execute(
        { userId, movieId, rating }: ReviewMovieUseCaseRequest,
        { protocol, endpoint, method, statusCode }: MetaData
    ): Promise<ReviewMovieUseCaseResponse> {
        const movie: Movie | null = await this.moviesRepository.findMovieByMovieIdAndUserId(userId, movieId)

        if (!movie) {
            throw new ResourceNotFoundError()
        }

        if (rating > 5) {
            await this.createLog.execute({
                protocol,
                endpoint,
                method,
                statusCode,
                sourceUniqueId: movie.id.toString()
            })
            throw new InvalidRatingMovie()
        }

        movie.rating = rating

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
            rating: movie.rating
        }
    }
}