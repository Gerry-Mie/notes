import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './auth.decorators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // for public route-----------------------------
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        // verify token ----------------------------------
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException({ code: 'unauthorized' });
        }
        const auth = admin.auth();
        try {
            request['user'] = await auth.verifyIdToken(token);
        } catch (e) {
            if (e.code === 'auth/id-token-expired') {
                throw new UnauthorizedException({ code: 'token-expired' });
            }
            throw new UnauthorizedException({ code: 'unauthorized' });
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
