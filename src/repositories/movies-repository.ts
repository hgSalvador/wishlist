import { Movie } from "../entities/movie"
import { PaginationParams } from "./pagination-params"

export interface MoviesRepository {
    findMovieByTmdbId(tmdbId: string): Promise<boolean>
    findMovieById(id: string): Promise<Movie | null>
    getAllMovies(userId: string, params: PaginationParams): Promise<Movie[]>
    save(movie: Movie): Promise<void>
    create(movie: Movie): Promise<void>
}