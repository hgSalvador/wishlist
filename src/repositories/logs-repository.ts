import { PaginationParams } from "./pagination-params";

export interface Log {
    id: string
    protocol: string
    endpoint: string
    method?: string
    statusCode: number
    sourceUniqueId: string
    timeStamps: Date
}

export interface LogsRepository {
    findManyLogsByMovieId(movieId: string, { page }: PaginationParams): Promise<Log[] | null>
    create(log: Log): Promise<Log>
    save(log: Log): Promise<void>
}