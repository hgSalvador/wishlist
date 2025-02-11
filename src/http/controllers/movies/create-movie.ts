import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateMovieUseCase } from '../../../use-cases/factories/make-create-movie-use-case';

const createMovieSchema = z.object({
  userId: z.string(),
  movieName: z.string(),
});

export async function createMovieController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { userId, movieName } = createMovieSchema.parse(request.body);

    const protocol = 'HTTP'
    const method = request.method
    const endpoint = request.originalUrl
    const statusCode = reply.statusCode


    const createMovieUseCase = makeCreateMovieUseCase();

    const result = await createMovieUseCase.execute(
      { userId, movieName },
      { protocol, method, endpoint, statusCode }
    );



    return reply.status(200).send(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.errors });
    }

    return reply.status(500).send({ error: 'Internal Server Error' });
  }
}