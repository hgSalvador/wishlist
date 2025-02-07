import { Movie } from "../entities/movie"
import { PaginationParams } from "./pagination-params"

export interface MoviesRepository {
    findMovieByTmdbId(tmdbId: string): Promise<boolean>
    getAllMovies(userId: string, params: PaginationParams): Promise<Movie[]>
    save(movie: Movie): Promise<void>
    create(movie: Movie): Promise<void>
}