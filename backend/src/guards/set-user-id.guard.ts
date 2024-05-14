import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Req } from 'src/utils/types/request';
import { parseJwt } from 'src/utils/helpers/jwt';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/auth/auth.types';

@Injectable()
export class SetUserIdGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const { headers, body }: Req<{ userId: number }> = context.switchToHttp().getRequest();
    const token: string = parseJwt(headers.authorization);
    const user: Payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    body.userId = user.sub

    return true
  }
}