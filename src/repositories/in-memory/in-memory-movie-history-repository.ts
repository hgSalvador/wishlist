import { MovieHistoryRepository } from "../history-movies-repository";
import { MovieHistory } from "../history-movies-repository";
import { PaginationParams } from "../pagination-params";

export class InMemoryMovieHistoryRepository implements MovieHistoryRepository {
    public items: MovieHistory[] = []

    async findManyMovieHistoriesByMovieId(movieHistoryId: string, { page }: PaginationParams) {
        const movieHistories = this.items.filter((item) => item.movieId.toString() === movieHistoryId).slice((page -1) * 20, page * 20)
    
        if (movieHistories.length === 0) {
            return null
        }
    
        return movieHistories
    }

    async create(movieHistory: MovieHistory) {
        this.items.push(movieHistory)
    }

    async save(movieHistory: MovieHistory) {
        const itemIndex = this.items.findIndex((item) => item.id === movieHistory.id)

        this.items[itemIndex] = movieHistory
    }
}