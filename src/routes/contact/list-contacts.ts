import { FastifyInstance } from 'fastify';

import { prisma } from '@/lib/prisma';

export async function listContacts(app: FastifyInstance) {
  app.get('/contacts', { preValidation: [app.verifyToken] }, async (request, reply) => {
    const contacts = await prisma.contact.findMany();

    if (!contacts) return reply.status(404).send({ message: 'Contacts not found' });

    return reply.status(200).send(contacts);
  });
}
