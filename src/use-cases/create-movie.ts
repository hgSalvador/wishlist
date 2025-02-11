import { UniqueEntityID } from "../entities/unique.entity-id";
import { Movie } from "../entities/movie";
import { CreateLogUseCase } from "./create-log";
import { CreateHistoryMovieUseCase } from "./create-history-movie";
import { MoviesRepository } from "../repositories/movies-repository";
import { TmdbMoviesServices } from "../services/tmdb-services";
import { MovieNotFoundError } from "./errors/movie-not-found";
import { Log } from "@prisma/client"; 



interface CreateMovieUseCaseRequest {
    userId: string
    movieName: string
    
}

interface CreateMovietUseCaseResponse {
    metaData: Log 
    movie: Movie
}

interface MetaData {
    protocol: string;
    endpoint: string;
    method: string;
    statusCode: number;
}

export class CreateMovieUseCase {
    constructor(
        private createLog: CreateLogUseCase,
        private createMovieHistory: CreateHistoryMovieUseCase,
        private moviesRepository: MoviesRepository,
        private tmdbServices: TmdbMoviesServices
    ) {}

    async execute(
    { userId, movieName }: CreateMovieUseCaseRequest,
    { protocol, endpoint, method, statusCode }: MetaData
): Promise<CreateMovietUseCaseResponse> {
        const isValidMovie = await this.tmdbServices.findMovieByName(movieName)

        if (!isValidMovie) {
            const test = await this.createLog.execute({
            protocol,
            endpoint,
            method,
            statusCode,
            sourceUniqueId: ''
        })
            throw new MovieNotFoundError()
        }

        const logProps = isValidMovie.metaData

        await this.createLog.execute({
            protocol: logProps.protocol,
            endpoint: logProps.endpoint,
            method: logProps.method,
            statusCode: 200,
            sourceUniqueId: isValidMovie.tmdbId
        })

        const movie = Movie.create({
            userId: new UniqueEntityID(userId),
            tmdbId: new UniqueEntityID(isValidMovie.tmdbId.toString()),
            title: isValidMovie.title,
            synopsis: isValidMovie.synopsis,
            releaseDate: isValidMovie.releaseDate,
            genre: isValidMovie.genre.toString(),
            state: 'To watch',
            rating: 1,
            recommended: true     
        })

        
        await this.moviesRepository.create(movie)

        
        const { log } = await this.createLog.execute({
            protocol,
            endpoint,
            method,
            statusCode,
            sourceUniqueId: movie.id.toString()
        })
        
        await this.createMovieHistory.execute({
            movieId: movie.id.toString(),
            newState: movie.state
        })


        return  {
            metaData: {
                id: log.id,
                protocol: log.protocol,
                endpoint: log.endpoint,
                method: log.method,
                statusCode: log.statusCode,
                sourceUniqueId: log.sourceUniqueId,
                timeStamps: log.timeStamps
            },
            movie
        }
    }
}