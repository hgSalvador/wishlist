import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetMovieUseCase } from '../../../use-cases/factories/make-get-movie-use-case';

const getMovieSchema = z.object({
  id: z.string(),
});

export async function getMovieController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = getMovieSchema.parse(request.params);

    const getMovieUseCase = makeGetMovieUseCase();

    const result = await getMovieUseCase.execute({ movieId: id });

    return reply.status(200).send(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.errors });
    }

    return reply.status(500).send({ error: 'Internal Server Error' });
  }
}