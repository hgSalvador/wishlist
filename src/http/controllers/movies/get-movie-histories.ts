import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetMovieHistoryUseCase } from '../../../use-cases/factories/make-get-movie-histories-use-case';

const getMovieHistoryParamsSchema = z.object({
  id: z.string(),
});

const getMovieHistoryQuerySchema = z.object({
  page: z.number().min(1),
});

interface GetMovieHistoryParams {
  id: string;
}

interface GetMovieHistoryQuery {
  page: number;
}

export async function getMovieHistoryController(
  request: FastifyRequest<{ Params: GetMovieHistoryParams; Querystring: GetMovieHistoryQuery }>,
  reply: FastifyReply
) {
  try {
    const params = getMovieHistoryParamsSchema.parse(request.params);
    const query = getMovieHistoryQuerySchema.parse(request.query);

    const getMovieHistoryUseCase = makeGetMovieHistoryUseCase();

    const result = await getMovieHistoryUseCase.execute({ movieId: params.id, page: query.page });

    return reply.status(200).send(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.errors });
    }

    return reply.status(500).send({ error: 'Internal Server Error' });
  }
}