import { FastifyInstance } from 'fastify';
import z from 'zod';

import { prisma } from '@/lib/prisma';

export async function listContact(app: FastifyInstance) {
  app.get('/contacts/:contactId', { preValidation: [app.verifyToken] }, async (request, reply) => {
    const requestParams = z.object({
      contactId: z.string().uuid(),
    });

    const { contactId } = requestParams.parse(request.params);

    const contact = await prisma.contact.findUnique({ where: { id: contactId } });

    if (!contact) return reply.status(404).send({ message: 'Contact not found' });

    return reply.status(200).send(contact);
  });
}
