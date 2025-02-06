import { TmdbMoviesServices } from "../tmdb-services";
import { Movie } from "../../entities/movie";
import { UniqueEntityID } from "../../entities/unique.entity-id";

const genericMovie = Movie.create({
    userId: new UniqueEntityID('user-01'),
    tmdbId: new UniqueEntityID('movie-01'),
    title: "Interstellar",
    synopsis: "A group of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseDate: "2014-11-07",
    genre: "Sci-Fi",
    state: "To watch",
    rating: 8,
    recommended: true,
})


export class InMemoryTmdbMoviesServices implements TmdbMoviesServices {
    public items: Movie[] = [genericMovie]

    async findMovieByName(name: string) {
        const movie = this.items.find((item) => item.title === name)

        if (!movie) {
            return null
        }

        return movie
        
    }
}