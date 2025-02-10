import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateMovieUseCase } from '../../../use-cases/factories/make-create-movie-use-case';

const createMovieSchema = z.object({
  userId: z.string(),
  movieName: z.string(),
  protocol: z.string(),
  endpoint: z.string(),
  method: z.string(),
  statusCode: z.number(),
});

export async function createMovieController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { userId, movieName, protocol, endpoint, method, statusCode } = createMovieSchema.parse(request.body);

    const createMovieUseCase = makeCreateMovieUseCase();

    const result = await createMovieUseCase.execute(
      { userId, movieName },
      { protocol, endpoint, method, statusCode }
    );

    return reply.status(200).send(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.errors });
    }

    return reply.status(500).send({ error: 'Internal Server Error' });
  }
}