import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  mongo: {
    connectionString: process.env.MONGODB_URL + 'kbc',
  },
}));
console.log('process.env.MONGODB_URL: ', process.env.MONGODB_URL);
