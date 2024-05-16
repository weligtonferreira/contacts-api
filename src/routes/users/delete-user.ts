import { FastifyInstance } from 'fastify';
import z from 'zod';

import { prisma } from '@/lib/prisma';

export async function deleteUser(app: FastifyInstance) {
  app.delete('/users/:id', { preValidation: [app.verifyToken] }, async (request, reply) => {
    const userParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = userParams.parse(request.params);

    const user = await prisma.user.findUnique({ where: { id } });

    if (user === null) {
      return reply.status(404).send({ message: 'User not found' });
    }

    await prisma.user.delete({
      where: { id },
    });

    return reply.status(200).send();
  });
}
