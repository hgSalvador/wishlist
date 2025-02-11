import axios from 'axios';
import { env } from '../../env';

export class TmdbMoviesServices {
  private token: string;
  private baseUrl: string;
  

  constructor() {
    this.token = env.BEARER_TOKEN_TMDB_AUTH;
    this.baseUrl = env.BASE_URL_TMDB;
  }

  async findMovieByName(movieName: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/search/movie`, {
        params: {
          query: movieName,
        },
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (response.data.results.length === 0) {
        return null;
      }

      const movie = response.data.results[0];

      return {
        tmdbId: movie.id,
        title: movie.title,
        synopsis: movie.overview,
        releaseDate: movie.release_date,
        genre: movie.genre_ids[0], 
        metaData: {
          protocol: 'HTTP',
          endpoint: `${this.baseUrl}/search/movie`,
          method: 'GET',
          statusCode: response.status,
          timeStamp: new Date(),
        },
      };
    } catch (error) {
      console.error('Error fetching movie from TMDB:', error);
      return null;
    }
  }
}