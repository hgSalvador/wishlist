import { FastifyRequest, FastifyReply } from 'fastify';
import { makeAuthenticateUseCase } from '../../use-cases/factories/make-authenticate-use-case';


export async function basicAuthMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [email, password] = credentials.split(':');

  const authenticateUseCase = makeAuthenticateUseCase();
  
  try {
    await authenticateUseCase.execute({ email, password });
  } catch (error) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
}
