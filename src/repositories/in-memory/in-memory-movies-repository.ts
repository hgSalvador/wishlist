import { Movie } from "../../entities/movie"


export interface MoviesRepository {
    save(movie: Movie): Promise<void>
    create(movie: Movie): Promise<void>
}