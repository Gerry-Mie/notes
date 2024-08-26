import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import { Reflector } from '@nestjs/core';
import { ADMIN_PERMISSION, IS_PUBLIC_KEY } from './auth.decorators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // for public route-----------------------------
        const isPublic = this.getMetaData(context, IS_PUBLIC_KEY);
        if (isPublic) {
            return true;
        }

        const requireAdminPermission = this.getMetaData(context, ADMIN_PERMISSION);

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

        if (requireAdminPermission && !request.user.isAdmin) {
            throw new UnauthorizedException({ code: 'unauthorized  dfss' });
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    getMetaData(context: ExecutionContext, key: string) {
        return this.reflector.getAllAndOverride<boolean>(key, [context.getHandler(), context.getClass()]);
    }
}
