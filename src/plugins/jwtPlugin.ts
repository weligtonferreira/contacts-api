import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fp from 'fastify-plugin';

import { UserTokenPayload } from '@/dto/UserTokenPayload';

async function jwtPlugin(app: FastifyInstance) {
  app.register(fastifyJwt, { secret: process.env.SECRECT_TOKEN as string });

  app.decorate('verifyToken', async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.headers.authorization?.replace(/^Bearer\s*/, '');

    if (!token) return reply.status(401).send({ message: 'Unauthorized: token is missing' });

    try {
      const decodedToken: UserTokenPayload = app.jwt.verify(token);
      request.userId = decodedToken.userId;
    } catch (err) {
      return reply.status(401).send({ message: 'Unauthorized: invalid token', err });
    }
  });
}

export default fp(jwtPlugin);
