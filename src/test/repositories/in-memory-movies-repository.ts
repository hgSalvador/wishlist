import { MoviesRepository } from "../../repositories/in-memory/in-memory-movies-repository";
import { Movie } from "../../entities/movie";

export class InMemoryMoviesRepository implements MoviesRepository {
    public items: Movie[] = []

    async create(movie: Movie) {
        this.items.push(movie)
    }

    async save(movie: Movie) {
        const itemIndex = this.items.findIndex((item) => item.id === movie.id)

        this.items[itemIndex] = movie
    }    
}