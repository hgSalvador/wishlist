import { randomUUID } from "crypto";
import { MovieHistory, MovieHistoryRepository } from "../repositories/history-movies-repository";
import { MoviesRepository } from "../repositories/movies-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface CreateHistoryMovieUseCaseRequest {
    movieId: string;
    newState: string;
}

export interface CreateHistoryMovieUseCaseResponse {
    movieHistory: MovieHistory;
}

export class CreateHistoryMovieUseCase {
    constructor(
        private moviesRepository: MoviesRepository,
        private moviesHistoryRepository: MovieHistoryRepository
    ) {}

    async execute({
        movieId,
        newState,
    }: CreateHistoryMovieUseCaseRequest): Promise<CreateHistoryMovieUseCaseResponse> {

        const movie = await this.moviesRepository.findMovieById(movieId.toString())
        
        if (!movie) {
            throw new ResourceNotFoundError();
        }
        
        const movieHistory: MovieHistory = {
            id: randomUUID().toString(),
            movieId: movie.id.toString(),
            newState: newState,
            createdAt: new Date()
        };
        

        await this.moviesHistoryRepository.create(movieHistory)


        
        return {
            movieHistory
        };
    }
}