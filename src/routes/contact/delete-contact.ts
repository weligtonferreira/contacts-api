import { FastifyInstance } from 'fastify';
import z from 'zod';

import { prisma } from '@/lib/prisma';

export async function deleteContact(app: FastifyInstance) {
  app.delete('/contacts/:contactId', { preValidation: [app.verifyToken] }, async (request, reply) => {
    const requestParams = z.object({
      contactId: z.string().uuid(),
    });

    const { contactId } = requestParams.parse(request.params);

    const contact = await prisma.contact.findUnique({ where: { id: contactId } });

    if (!contact) return reply.status(404).send({ message: 'Contact not found' });

    await prisma.contact.delete({ where: { id: contactId } });

    return reply.status(200).send();
  });
}
