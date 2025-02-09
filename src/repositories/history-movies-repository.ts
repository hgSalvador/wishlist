import { PaginationParams } from "./pagination-params"

export interface MovieHistory {
    id: string
    movieId: string
    newState: string
    createdAt: Date
    updatedAt?: Date
}


export interface MovieHistoryRepository {
    findManyMovieHistoriesByMovieId(movieId: string,  { page }: PaginationParams): Promise<MovieHistory[] | null>
    create(movieHistory: MovieHistory): Promise<void>
    save(movieHistory: MovieHistory): Promise<void>
}