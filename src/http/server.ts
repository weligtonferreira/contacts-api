import fastify from 'fastify';

import { createUser } from '@/routes/users/create-user';

const app = fastify();

app.register(createUser);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server is running...');
});
