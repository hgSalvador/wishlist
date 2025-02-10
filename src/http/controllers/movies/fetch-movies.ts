import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeFetchMoviesUseCase } from '../../../use-cases/factories/make-fetch-movies-use-case';

const fetchMoviesSchema = z.object({
  userId: z.string(),
  page: z.number().min(1),
});

export async function fetchMoviesController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { userId, page } = fetchMoviesSchema.parse(request.query);

    const fetchMoviesUseCase = makeFetchMoviesUseCase();

    const result = await fetchMoviesUseCase.execute({ userId, page });

    return reply.status(200).send(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.errors });
    }

    return reply.status(500).send({ error: 'Internal Server Error' });
  }
}