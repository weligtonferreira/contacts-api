import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import z from 'zod';

import { prisma } from '@/lib/prisma';

export async function authenticateUser(app: FastifyInstance) {
  app.post('/users/auth', async (request, reply) => {
    const userRequest = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = userRequest.parse(request.body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }

    const isAValidPassword = await bcrypt.compare(password, user.password);

    if (!isAValidPassword) {
      return reply.status(400).send({ message: 'Email or password invalid' });
    }

    const token = app.jwt.sign({ userId: user.id, email }, { expiresIn: '5d' });

    request.user = user;

    return reply.status(200).send({ token, userId: user.id });
  });
}
