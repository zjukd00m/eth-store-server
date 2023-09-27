import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        const cookies = req.cookies;
        const headers = req.headers;

        console.log('==> Request cookies');
        console.log(cookies);
        console.log(cookies?.auth);
        console.log(headers);
        console.log('<==');

        return true;
    }
}
