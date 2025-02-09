import { Movie } from "../entities/movie";
import { MoviesRepository } from "../repositories/movies-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface FetchMoviesUseCaseRequest {
    userId: string
    page: number
}

interface FetchQuestionUseCaseResponse {
    movies: Movie[]
}

export class FetchMoviesUseCase {
    constructor(private moviesRepository: MoviesRepository) {}

    async execute({
        userId,
        page,
    }: FetchMoviesUseCaseRequest): Promise<FetchQuestionUseCaseResponse> {
        const movies = await this.moviesRepository.getAllMovies(userId, { page })

        if (movies.length === 0) {
            throw new ResourceNotFoundError()
        }
        
        return {
            movies
        }
    }
}