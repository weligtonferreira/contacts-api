import { FastifyInstance } from 'fastify';

import { prisma } from '@/lib/prisma';

export async function listUsers(app: FastifyInstance) {
  app.get('/users', { preValidation: [app.authenticate] }, async (request, reply) => {
    const users = await prisma.user.findMany();

    return reply.status(200).send(users);
  });
}
