import { MoviesRepository } from "../movies-repository";
import { Movie } from "../../entities/movie";

export class InMemoryMoviesRepository implements MoviesRepository {
    public items: Movie[] = []

    async findMovieByTmdbId(tmdbId: string) {
        const movie = this.items.find((item) => item.tmdbId === tmdbId)

        if (!movie) {
            return null
        }

        return movie
    }
    
    async create(movie: Movie) {
        this.items.push(movie)
    }

    async save(movie: Movie) {
        const itemIndex = this.items.findIndex((item) => item.id === movie.id)

        this.items[itemIndex] = movie
    }    
}