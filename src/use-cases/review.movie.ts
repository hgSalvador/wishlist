import { Movie } from "../entities/movie";
import { MoviesRepository } from "../repositories/movies-repository";
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

export class ReviewMovieUseCase {
    constructor(private moviesRepository) {}

    async execute({
        userId,
        movieId,
        rating,
    }: ReviewMovieUseCaseRequest): Promise<ReviewMovieUseCaseResponse> {
        const movie: Movie = await this.moviesRepository.findMovieByMovieIdAndUserId(userId, movieId)

        if (!movie) {
            throw new ResourceNotFoundError()
        }

        if (rating > 5) {
            throw new InvalidRatingMovie()
        }

        movie.rating = rating

        await this.moviesRepository.save(movie)

        return {
            movieId: movie.id.toString(),
            rating: movie.rating
        }
    }
}