import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { EthereumService } from 'src/ethereum/ethereum.service';
import { ILoginResponse } from './auth.interfaces';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly ethService: EthereumService,
    ) {}

    // Create the cookie with the jwt inside as http-only
    async login(req: Request): Promise<ILoginResponse> {
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
