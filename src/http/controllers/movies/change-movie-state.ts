import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeChangeMovieStateUseCase } from '../../../use-cases/factories/make-change-movie-state-use-case';

const changeMovieStateSchema = z.object({
  userId: z.string(),
  movieId: z.string(),
  state: z.string(),
  protocol: z.string(),
  endpoint: z.string(),
  method: z.string(),
  statusCode: z.number(),
});

export async function changeMovieStateController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { userId, movieId, state, protocol, endpoint, method, statusCode } = changeMovieStateSchema.parse(request.body);

    const changeMovieStateUseCase = makeChangeMovieStateUseCase();

    const result = await changeMovieStateUseCase.execute(
      { userId, movieId, state },
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