import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IAuthRequest, IAuthUserPayload } from './auth.interfaces';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    constructor(private readonly jwtService: JwtService) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Promise<Observable<any>> {
        const request: IAuthRequest = context.switchToHttp().getRequest();

        if (!request.headers.authorization?.length) {
            throw new UnauthorizedException({
                message: 'The user is not authorized to perform the action',
            });
        }

        const jwt = request.headers.authorization.split('Bearer ')[1];

        try {
            const payload = await this.jwtService.verifyAsync<IAuthUserPayload>(
                jwt,
            );

            request.user = payload.data;

            return next.handle();
        } catch (error) {
            throw new UnauthorizedException({
                message: 'The user is not authorized to perform the action',
                details: error.message,
            });
        }
    }
}
