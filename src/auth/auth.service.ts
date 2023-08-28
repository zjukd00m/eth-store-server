import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    // Create the cookie with the jwt inside as http-only
    async login(req: Request): Promise<{
        token: string;
    }> {
        const payload = {
            data: {
                wallet: '',
            },
            sub: 'same-as-wallet',
            iat: Math.floor(new Date().getTime() / 1000),
        };

        const token = await this.jwtService.signAsync(payload);

        return { token };
    }

    // Expire the cookie
    // async logout(req: Request, res: Response) {}
}
