import { watch } from "fs";
import { MovieHistory } from "../repositories/history-movies-repository";
import { MovieHistoryRepository } from "../repositories/history-movies-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface GetMovieHistoryUseCaseRequest {
    movieHistoryId: string
}

interface GetMovieHistoryUseCaseResponse {
    movieHistory: MovieHistory
}

export class GetMovieHistoryUseCase {
    constructor(private movieHistoryRepository: MovieHistoryRepository) {}

    async execute({
        movieHistoryId
    }: GetMovieHistoryUseCaseRequest): Promise<GetMovieHistoryUseCaseResponse> {
        const movieHistory = await this.movieHistoryRepository.findMovieHistoryById(movieHistoryId)

        if (!movieHistory) {
            throw new ResourceNotFoundError()
        }

        return movieHistory 
    }
}