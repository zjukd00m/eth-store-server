import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IAuthRequest, IAuthUserPayload } from './auth.interfaces';
import { Repository } from 'typeorm';
import { JWToken } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';

// Logic can be executed before and after the call handler is called
@Injectable()
export class AuthInterceptor implements NestInterceptor {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(JWToken)
        private readonly tokenRepository: Repository<JWToken>,
    ) {}

    // The Execution context inherits from ArgumentsHost
    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Promise<Observable<any>> {
        const request: IAuthRequest = context.switchToHttp().getRequest();

        if (!request.headers.authorization?.length) {
            throw new UnauthorizedException();
        }

        const jwt = request.headers.authorization.split('Bearer ')[1];

        // Verify if the token is not revoked
        try {
            const storedToken = await this.tokenRepository.findOneByOrFail({
                token: jwt,
            });

            if (storedToken.revoked) {
                throw new UnauthorizedException();
            }
        } catch (error) {
            throw new NotFoundException({
                message: error.message,
                statusCode: 404,
            });
        }

        try {
            const payload = await this.jwtService.verifyAsync<IAuthUserPayload>(
                jwt,
            );

            request.user = payload.data;

            // Invoke the route handler which returns an Observable
            return next.handle();
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
