import { MovieHistoryRepository } from "../history-movies-repository";
import { MovieHistory } from "../history-movies-repository";
import { PaginationParams } from "../pagination-params";

export class InMemoryMovieHistoryRepository implements MovieHistoryRepository{
    public items: MovieHistory[] = []

    async findMovieHistoryById(movieHistoryId: string) {
        const movieHistory = this.items.find((item) => item.id === movieHistoryId)

        if (!movieHistory) {
            return null
        }

        return movieHistory
    }

    async create(movieHistory: MovieHistory) {
        this.items.push(movieHistory)
    }

    async save(movieHistory: MovieHistory) {
        const itemIndex = this.items.findIndex((item) => item.id === movieHistory.id)

        this.items[itemIndex] = movieHistory
    }
}