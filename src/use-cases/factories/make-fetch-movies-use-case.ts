import { PrismaMoviesRepository } from "../../repositories/prisma/prisma-movies-repository";
import { FetchMoviesUseCase } from "../fetch-movies";

export function makeFetchMoviesUseCase() {
    const moviesRepository = new PrismaMoviesRepository();
    const fetchMoviesUseCase = new FetchMoviesUseCase(moviesRepository);  

    return fetchMoviesUseCase
}