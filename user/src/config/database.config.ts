import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  initialUser: {
    firstName: 'Super',
    lastName: 'Admin',
    gender: 'Male',
    email: 'superadmin@yopmail.com',
    password: 'Admin@1234', // nosonar
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
}));
