import Fastify from 'fastify';
import { moviesRoutes } from './controllers/movies/routes';
import { env } from '../env';
import net from 'net';

const server = Fastify({
  logger: true,
});

server.register(moviesRoutes, { prefix: '/api' });

const checkPort = (port: number) => {
  return new Promise((resolve, reject) => {
    const tester = net.createServer()
      .once('error', (err: any) => (err.code === 'EADDRINUSE' ? reject(err) : resolve(null)))
      .once('listening', () => tester.once('close', () => resolve(null)).close())
      .listen(port);
  });
};

const start = async () => {
  try {
    await server.listen({ port: env.PORT, host: '0.0.0.0' });
    console.log(`Server is running at http://localhost:${env.PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1); 
  }
};

start();