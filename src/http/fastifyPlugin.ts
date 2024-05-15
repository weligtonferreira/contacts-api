import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fp from 'fastify-plugin';

async function jwtPlugin(app: FastifyInstance) {
  app.register(fastifyJwt, { secret: process.env.SECRECT_TOKEN as string });

  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
}

export default fp(jwtPlugin);
