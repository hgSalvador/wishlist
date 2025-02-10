import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeReviewMovieUseCase } from '../../../use-cases/factories/make-review-movie-use-case';

const reviewMovieSchema = z.object({
  userId: z.string(),
  movieId: z.string(),
  rating: z.number().min(0).max(5),
  protocol: z.string(),
  endpoint: z.string(),
  method: z.string(),
  statusCode: z.number(),
});

export async function reviewMovieController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { userId, movieId, rating, protocol, endpoint, method, statusCode } = reviewMovieSchema.parse(request.body);

    const reviewMovieUseCase = makeReviewMovieUseCase();

    const result = await reviewMovieUseCase.execute(
      { userId, movieId, rating },
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