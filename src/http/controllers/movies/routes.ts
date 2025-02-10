import { FastifyInstance } from 'fastify';
import { createMovieController } from './create-movie'; 
import { fetchMoviesController } from './fetch-movies';
import { getMovieController } from './get-movie'; 
import { changeMovieStateController } from './change-movie-state'; 
import { reviewMovieController } from './review-movie'; 
import { getMovieHistoryController } from './get-movie-histories'; 
import { basicAuthMiddleware } from '../../middlewares/basic-auth-middleware';

export async function moviesRoutes(server: FastifyInstance) {
  server.post('/filme', { preHandler: basicAuthMiddleware }, createMovieController);
  server.get('/filme', { preHandler: basicAuthMiddleware }, fetchMoviesController);
  server.get('/filme/:id', { preHandler: basicAuthMiddleware }, getMovieController);
  server.put('/filme/:id/estado', { preHandler: basicAuthMiddleware }, changeMovieStateController);
  server.post('/filme/:id/avaliar', { preHandler: basicAuthMiddleware }, reviewMovieController);
  // server.get('/filme/:id/historico', { preHandler: basicAuthMiddleware }, getMovieHistoryController);
}