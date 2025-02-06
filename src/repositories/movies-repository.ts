import { Movie } from "../entities/movie"


export interface MoviesRepository {
    findMovieByTmdbId(tmdbId: string): Promise<Movie | null>
    save(movie: Movie): Promise<void>
    create(movie: Movie): Promise<void>
}