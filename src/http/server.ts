import fastify from 'fastify';

import { createUser } from '@/routes/users/create-user';
import { listUsers } from '@/routes/users/list-users';

const app = fastify();

app.register(createUser);
app.register(listUsers);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server is running...');
});
