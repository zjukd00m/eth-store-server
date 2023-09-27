import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { IAuthUserPayload } from './auth.interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        if (!req.headers?.authorization?.length) {
            return false;
        }

        if (!req.headers?.authorization.includes('Bearer')) {
            return false;
        }

        const token = req.headers.authorization.split('Bearer ')[1];

        const expectedClaim = 'ADMINISTRADORE';

        try {
            const payload: IAuthUserPayload = await this.jwtService.verifyAsync(
                token,
            );

            const {
                data: { claim, wallet },
            } = payload;

            if (claim !== expectedClaim) {
                return false;
            }

            // In production, only one wallet can have access to it all
            if (process.env.PRODUCTION === '1')
                if (wallet !== '') {
                    return false;
                }

            return true;
        } catch (error) {
            return false;
        }
    }
}
