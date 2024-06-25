import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import z from 'zod';

import { prisma } from '@/lib/prisma';

interface UpdatedUserProps {
  name?: string;
  email?: string;
  password?: string;
}

export async function updateUser(app: FastifyInstance) {
  app.put(
    '/users/:id',
    { preValidation: [app.verifyToken] },
    async (request, reply) => {
      const userParams = z.object({
        id: z.string().uuid(),
      });

      const updatedUserData = request.body as UpdatedUserProps;
      const { id } = userParams.parse(request.params);

      const user = await prisma.user.findUnique({ where: { id } });

      if (user === null) {
        return reply.status(404).send({ message: 'User not found' });
      }

      if (updatedUserData.password) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          8
        );
      }

      const updatedUser = await prisma.user.update({
        data: updatedUserData,
        where: { id },
      });

      return reply.status(200).send({ updatedUser });
    }
  );
}
