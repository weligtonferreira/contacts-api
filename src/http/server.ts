import fastify from 'fastify';

import jwtPlugin from '@/plugins/jwtPlugin';

import { authenticateUser } from '@/routes/user/authenticate-user';
import { createUser } from '@/routes/user/create-user';
import { listUsers } from '@/routes/user/list-users';
import { listUser } from '@/routes/user/list-user';
import { updateUser } from '@/routes/user/update-user';
import { deleteUser } from '@/routes/user/delete-user';

const app = fastify();

app.register(jwtPlugin);

app.register(authenticateUser);
app.register(createUser);
app.register(listUsers);
app.register(listUser);
app.register(updateUser);
app.register(deleteUser);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server is running...');
});
