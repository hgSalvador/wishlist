import { MoviesRepository } from "../movies-repository";
import { Movie } from "../../entities/movie";
import { PaginationParams } from "../pagination-params";

export class InMemoryMoviesRepository implements MoviesRepository {
    public items: Movie[] = []

    async findMovieById(id: string) {
        const movie = this.items.find((item) => item.id.toString() === id)

        if (!movie) {
            return null
        }

        return movie
    }

    async getAllMovies(userId, { page }: PaginationParams) {
        const movies = this.items
        .filter((item) => item.userId.toString() === userId)
        .sort((a, b) => a.title.localeCompare(b.title))
        .slice((page -1) * 20, page * 20)

        return movies
    }

    async findMovieByTmdbId(tmdbId: string) {
        return this.items.some((item) => item.tmdbId.toString() === tmdbId)
    }
    
    async create(movie: Movie) {
        this.items.push(movie)
    }

    async save(movie: Movie) {
        const itemIndex = this.items.findIndex((item) => item.id === movie.id)

        this.items[itemIndex] = movie
    }    
}