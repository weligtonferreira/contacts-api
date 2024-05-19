import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

import { prisma } from '@/lib/prisma';

export async function createContact(app: FastifyInstance) {
  app.post('/contacts', { preValidation: [app.verifyToken] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const createUserBody = z.object({
      name: z.string(),
      phone: z.string(),
    });

    const { name, phone } = createUserBody.parse(request.body);

    const contact = await prisma.contact.create({
      data: { name, phone, userId: request.userId },
    });

    return reply.status(201).send({ contactId: contact.id });
  });
}
