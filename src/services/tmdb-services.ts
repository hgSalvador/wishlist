export interface TmdbMoviesServicesSuccesResponse {
    metaData: {
        protocol: string
        endpoint: string
        method: string
        statusCode: number
        timeStamp: Date
    }
    tmdbId: string
    title: string
    synopsis: string
    releaseDate: string
    genre: number
}


export interface TmdbMoviesServices {
    findMovieByName(name: string): Promise<TmdbMoviesServicesSuccesResponse | null>
}