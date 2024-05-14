import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import z from 'zod';

import { prisma } from '@/lib/prisma';

export async function updateUser(app: FastifyInstance) {
  app.put('/users/:id', async (request, reply) => {
    const updateUserBody = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const userParams = z.object({
      id: z.string().uuid(),
    });

    const { name, email, password } = updateUserBody.parse(request.body);
    const { id } = userParams.parse(request.params);

    const user = await prisma.user.findUnique({ where: { id } });

    if (user === null) {
      return reply.status(404).send({ message: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 8),
      },
      where: { id },
    });

    return reply.status(200).send({ updatedUser });
  });
}
