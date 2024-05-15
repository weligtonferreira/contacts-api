import { FastifyInstance } from 'fastify';
import { prisma } from '@/lib/prisma';
import z from 'zod';

export async function listUser(app: FastifyInstance) {
  app.get('/users/:id', { preValidation: [app.authenticate] }, async (request, reply) => {
    const userParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = userParams.parse(request.params);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return reply.status(200).send(user);
  });
}
