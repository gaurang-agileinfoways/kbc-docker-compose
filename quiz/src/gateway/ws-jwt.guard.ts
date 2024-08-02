import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    if (context.getType() !== 'ws') return true;

    const client: Socket = context.switchToWs().getClient();

    const { authorization } = client.handshake.headers;

    if (!authorization) {
      return false;
    }

    return true;
  }

  static async validateToken(client: Socket) {
    const { authorization } = client.handshake.headers;
    const token = authorization?.split(' ')[1];

    if (!token) {
      return false;
    }
    try {
      const data = verify(token, 'jwt-secret-key');
      return data;
    } catch (error) {
      return false;
    }
  }
}
