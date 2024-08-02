import { Socket } from 'socket.io';
import { JwtAuthGuard } from './ws-jwt.guard';
import { UnauthorizedException } from '@nestjs/common';

type SocketMiddleware = {
  (clint: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (): SocketMiddleware => {
  return async (client, next) => {
    try {
      const data = await JwtAuthGuard.validateToken(client as any);
      if (!data) {
        client.emit('error', { status: 'error', message: 'Unauthorized' });
        return next(new UnauthorizedException());
      }

      client.data['user'] = data;
      next();
    } catch (error) {
      throw error;
    }
  };
};
