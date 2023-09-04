import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EthereumService } from 'src/ethereum/ethereum.service';
import { LoginDTO } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly ethService: EthereumService,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    // Create the cookie with the jwt inside as http-only
    async login(request: LoginDTO) {
        const { wallet } = request;

        // Verify if the user exists, otherwise register it
        const existUser = await this.usersRepository.exist({
            where: { wallet },
            select: { wallet: true },
        });

        if (!existUser) {
            const user = this.usersRepository.create({ wallet });
            await this.usersRepository.save(user);
        }

        // Generate the jwt token with issued-at and expires-at data
        const issuedAt = new Date();

        const payload = {
            data: {
                wallet,
            },
            sub: wallet,
            iat: Math.floor(issuedAt.getTime() / 1000),
        };

        // TODO: Generate the auth token and store it as an http-cookie
        const token = await this.jwtService.signAsync(payload);

        return { token };
    }
}
