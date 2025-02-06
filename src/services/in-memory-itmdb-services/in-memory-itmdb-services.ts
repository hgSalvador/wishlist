import { ItmdbMoviesServices } from "../../services/itmdb-services";
import { Movie } from "../../entities/movie";

export class InMemoryItmdMoviesServices implements ItmdbMoviesServices {
    public items: Movie[] = []

    async getMovieByName(name: string) {
        throw new Error("Method not implemented.");
    }



}