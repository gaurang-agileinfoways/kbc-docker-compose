import { registerAs } from '@nestjs/config';

export default registerAs('user', () => ({
  port: process.env.USER_SERVICE_PORT,
  host: process.env.USER_SERVICE_HOST,
}));
