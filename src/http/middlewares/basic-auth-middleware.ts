import { FastifyRequest, FastifyReply } from 'fastify';
import { makeAuthenticateUseCase } from '../../use-cases/factories/make-authenticate-use-case';


export async function basicAuthMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [name, password] = credentials.split(':');
  console.log(name, password)

  const fixedName = 'admin'; 
  const fixedPassword = '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Fjs1K1E6QJ2l5z5J1U1eW'; 

  console.log('name', name, 'password', password);

  if (name !== fixedName || password !== fixedPassword) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }



  const authenticateUseCase = makeAuthenticateUseCase();
  console.log('lalau')
  try {
    await authenticateUseCase.execute({ email: name, password });
  } catch (error) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
}
