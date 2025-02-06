interface ItmdMoviesServicesResponse {
    tmdbId: string
    title: string
    synopsis: string
    releaseDate: string
    genre: string
    state: string
    rating: number
    recommended: boolean
}


export interface ItmdbMoviesServices {
    getMovieByName(name: string): Promise<ItmdMoviesServicesResponse>
}