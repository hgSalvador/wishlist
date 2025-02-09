import { watch } from "fs";
import { MovieHistory } from "../repositories/history-movies-repository";
import { MovieHistoryRepository } from "../repositories/history-movies-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { Resolver } from "dns";

interface GetMovieHistoryUseCaseRequest {
    movieId: string
    page: number
}

interface GetMovieHistoryUseCaseResponse {
    movieHistories: MovieHistory[]
}

export class GetMovieHistoryUseCase {
    constructor(private movieHistoryRepository: MovieHistoryRepository) {}

    async execute({
        movieId,
        page
    }: GetMovieHistoryUseCaseRequest): Promise<GetMovieHistoryUseCaseResponse> {
        const movieHistories = await this.movieHistoryRepository.findManyMovieHistoriesByMovieId(movieId, { page })

        if (!movieHistories) {
            throw new ResourceNotFoundError()
        }

        if (movieHistories?.length === 0) {
            throw new ResourceNotFoundError()
        }

        return {
            movieHistories: movieHistories
        }
    }
}