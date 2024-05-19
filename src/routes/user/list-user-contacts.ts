import { FastifyInstance } from 'fastify';
import z from 'zod';

import { prisma } from '@/lib/prisma';

export async function listUserContacts(app: FastifyInstance) {
  app.get('/users/:userId/contacts', { preValidation: [app.verifyToken] }, async (request, reply) => {
    const requestParams = z.object({
      userId: z.string().uuid(),
    });

    const { userId } = requestParams.parse(request.params);

    const userContacts = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        _count: true,
        createdAt: true,
        updatedAt: true,
        contacts: true,
      },
    });

    return reply.status(200).send({
      id: userContacts?.id,
      name: userContacts?.name,
      email: userContacts?.email,
      contactsCount: userContacts?._count.contacts,
      contacts: userContacts?.contacts,
      createdAt: userContacts?.createdAt,
      updatedAt: userContacts?.updatedAt,
    });
  });
}
