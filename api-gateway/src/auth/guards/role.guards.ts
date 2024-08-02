import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_IS_PUBLIC_KEY } from 'src/common/constants';
import { Role } from 'src/common/constants/role.enum';
import { ROLES_KEY } from 'src/common/decorators/role.decorator';
import { AuthExceptions } from 'src/common/helpers/exceptions';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      AUTH_IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const roleGuard = requiredRoles.some((role) => user.role == role);
    if (!roleGuard) {
      throw AuthExceptions.ForbiddenException();
    } else {
      return roleGuard;
    }
  }
}
