import { FastifyInstance } from 'fastify';
import { authenticateController } from './authenticate'; 

export async function usersRoutes(server: FastifyInstance) {
  server.post('/auth', authenticateController);
}