import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { InvalidCredentials } from '../../../use-cases/errors/invalid-credentials';
import { compare } from 'bcryptjs';

const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = authenticateSchema.parse(request.body);

    const fixedUser = {
      id: '1',
      email: 'admin',
      password: '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Fjs1K1E6QJ2l5z5J1U1eW', // bcrypt hash for 'password123'
    };

    if (email !== fixedUser.email) {
      throw new InvalidCredentials();
    }

    const doesPasswordMatches = await compare(password, fixedUser.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentials();
    }

    return reply.status(200).send({ user: { id: fixedUser.id, email: fixedUser.email } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.errors });
    }

    if (error instanceof InvalidCredentials) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }

    return reply.status(500).send({ error: 'Internal Server Error' });
  }
}