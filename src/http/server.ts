import fastify from 'fastify';

import fastifyPlugin from './fastifyPlugin';

import { authenticateUser } from '@/routes/users/authenticate-user';
import { createUser } from '@/routes/users/create-user';
import { listUsers } from '@/routes/users/list-users';
import { listUser } from '@/routes/users/list-user';
import { updateUser } from '@/routes/users/update-user';
import { deleteUser } from '@/routes/users/delete-user';

const app = fastify();

app.register(fastifyPlugin);

app.register(authenticateUser);
app.register(createUser);
app.register(listUsers);
app.register(listUser);
app.register(updateUser);
app.register(deleteUser);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server is running...');
});
