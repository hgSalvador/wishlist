import { TmdbMoviesServices } from "../tmdb-services";
import { Movie } from "../../entities/movie";

export class InMemoryItmdMoviesServices implements TmdbMoviesServices {
    public items: Movie[] = []

    async getMovieByName(name: string) {
        throw new Error("Method not implemented.");
    }



}