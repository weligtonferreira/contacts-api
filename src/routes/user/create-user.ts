import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import z from 'zod';

import { prisma } from '@/lib/prisma';

export async function createUser(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const createUserBody = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const { name, email, password } = createUserBody.parse(request.body);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 8),
      },
    });

    return reply.status(201).send({ userId: user.id });
  });
}
