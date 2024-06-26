import fastify from 'fastify';
import cors from '@fastify/cors';

import jwtPlugin from '@/plugins/jwtPlugin';

import { authenticateUser } from '@/routes/user/authenticate-user';
import { createUser } from '@/routes/user/create-user';
import { listUsers } from '@/routes/user/list-users';
import { listUser } from '@/routes/user/list-user';
import { listUserContacts } from '@/routes/user/list-user-contacts';
import { updateUser } from '@/routes/user/update-user';
import { deleteUser } from '@/routes/user/delete-user';

import { createContact } from '@/routes/contact/create-contact';
import { listContact } from '@/routes/contact/list-contact';
import { listContacts } from '@/routes/contact/list-contacts';
import { updateContact } from '@/routes/contact/update-contact';
import { deleteContact } from '@/routes/contact/delete-contact';

const app = fastify();

app.register(cors, {
  origin: '*',
});

app.register(jwtPlugin);

app.register(authenticateUser);
app.register(createUser);
app.register(listUsers);
app.register(listUser);
app.register(listUserContacts);
app.register(updateUser);
app.register(deleteUser);

app.register(createContact);
app.register(listContact);
app.register(listContacts);
app.register(updateContact);
app.register(deleteContact);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server is running...');
});
