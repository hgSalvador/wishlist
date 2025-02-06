interface TmdbMoviesServicesResponse {
    tmdbId: string
    title: string
    synopsis: string
    releaseDate: string
    genre: string
    state: string
    rating: number
    recommended: boolean
}


export interface TmdbMoviesServices {
    getMovieByName(name: string): Promise<TmdbMoviesServicesResponse>
}