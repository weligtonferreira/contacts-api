import { FastifyInstance } from 'fastify';
import z from 'zod';

import { prisma } from '@/lib/prisma';

export async function updateContact(app: FastifyInstance) {
  app.put('/contacts/:contactId', { preValidation: [app.verifyToken] }, async (request, reply) => {
    const requestBody = z.object({
      name: z.string(),
      phone: z.string(),
    });

    const requestParams = z.object({
      contactId: z.string().uuid(),
    });

    const { name, phone } = requestBody.parse(request.body);
    const { contactId } = requestParams.parse(request.params);

    const contact = await prisma.contact.findUnique({ where: { id: contactId } });

    if (!contact) return reply.status(404).send({ message: 'Contact not found' });

    await prisma.contact.update({
      data: {
        name,
        phone,
      },
      where: { id: contactId },
    });

    return reply.status(200).send();
  });
}
