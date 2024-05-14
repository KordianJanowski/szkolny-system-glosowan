import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { Req } from '../utils/types/request';
import { parseJwt } from '../utils/helpers/jwt';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../auth/auth.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { headers }: Req<{}> = context.switchToHttp().getRequest();
    const token: string = parseJwt(headers.authorization);
    const user: Payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}