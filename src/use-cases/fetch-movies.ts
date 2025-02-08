import { Movie } from "../entities/movie";
import { MoviesRepository } from "../repositories/movies-repository";

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
        
        return {
            movies
        }
    }
}