import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../iam.constants';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request[REQUEST_USER_KEY] as ActiveUserData | undefined;
    return field ? user?.[field] : user;
  },
);
