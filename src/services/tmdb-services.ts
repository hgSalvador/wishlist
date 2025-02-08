export interface TmdbMoviesServicesResponse {
    tmdbId: string
    title: string
    synopsis: string
    releaseDate: string
    genre: string
    recommended: boolean
}


export interface TmdbMoviesServices {
    findMovieByName(name: string): Promise<TmdbMoviesServicesResponse | null>
}