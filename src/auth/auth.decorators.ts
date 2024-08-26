import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodedIdToken } from './auth.types';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ADMIN_PERMISSION = 'isAdmin';
export const AdminPermission = () => SetMetadata(ADMIN_PERMISSION, true);

export const RequestUser = createParamDecorator<unknown, ExecutionContext>((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as DecodedIdToken;
});
