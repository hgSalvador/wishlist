import { TmdbMoviesServices, TmdbMoviesServicesResponse } from "../tmdb-services";

export class InMemoryTmdbMoviesServices implements TmdbMoviesServices {
    public items: TmdbMoviesServicesResponse[] = [{
        tmdbId: 'tmdb-01',
        title: "Interstellar",
        synopsis: "A group of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        releaseDate: "2014-11-07",
        genre: "Sci-Fi",
        recommended: true,
    }]

    async findMovieByName(name: string) {
        const movie = this.items.find((item) => item.title === name)

        if (!movie) {
            return null
        }

        return movie
    }
}