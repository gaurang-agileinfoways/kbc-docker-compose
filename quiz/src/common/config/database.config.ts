import { registerAs } from '@nestjs/config';

console.log('process.env.MONGODB_URL: ', process.env.MONGODB_URL);
export default registerAs('database', () => ({
  mongo: {
    connectionString: process.env.MONGODB_URL + 'kbc',
  },
}));
