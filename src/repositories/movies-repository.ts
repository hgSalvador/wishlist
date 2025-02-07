import { Movie } from "../entities/movie"
import { TmdbMoviesServicesResponse } from "../services/tmdb-services"


export interface MoviesRepository {
    findMovieByTmdbId(tmdbId: string): Promise<boolean>
    save(movie: Movie): Promise<void>
    create(movie: Movie): Promise<void>
}