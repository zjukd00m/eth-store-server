import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EthereumService } from 'src/ethereum/ethereum.service';
import { LoginDTO } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IAuthRequest, IAuthUserPayload } from './auth.interfaces';
import { JWToken } from './auth.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly ethService: EthereumService,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(JWToken)
        private readonly tokenRepository: Repository<JWToken>,
    ) {}

    // Create the cookie with the jwt inside as http-only
    async login(request: LoginDTO) {
        const { wallet, signature, message } = request;

        let user: User;

        // Verify if the user exists, otherwise register it
        user = await this.usersRepository.findOne({
            where: { wallet },
            select: { wallet: true },
        });

        if (!user) {
            user = this.usersRepository.create({ wallet });
            user = await this.usersRepository.save(user);
        }

        // Verify if the message and the signature are valid
        const isValidEthereumSignature = await this.ethService
            .verifyMessageSignature({
                wallet,
                signature,
                message,
            })
            .then((isValid) => isValid)
            .catch((error) => {
                if (error.code === 'INVALID_ARGUMENT')
                    throw new HttpException(
                        {
                            message: error.message,
                        },
                        HttpStatus.BAD_REQUEST,
                    );
                throw new HttpException(
                    {
                        message: error.message,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            });

        if (!isValidEthereumSignature) {
            throw new HttpException(
                {
                    message: 'Invalid ethereum signature',
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        // Generate the jwt token with issued-at and expires-at data
        const issuedAt = new Date();

        const payload: IAuthUserPayload = {
            data: {
                wallet,
                confirmed: user.confirmed,
                ...(user.email?.length && { email: user.email }),
            },
            sub: wallet,
            iat: Math.floor(issuedAt.getTime() / 1000),
        };

        const accessToken = await this.jwtService.signAsync(payload);

        const jwtToken = this.tokenRepository.create({
            token: accessToken,
        });

        await this.tokenRepository.save(jwtToken);

        return { accessToken };
    }

    async logout(request: IAuthRequest, token: string) {
        try {
            const storedToken = await this.tokenRepository.findOneByOrFail({
                token,
            });

            storedToken.revoked = true;

            await this.tokenRepository.save(storedToken);

            return 200;
        } catch (error) {
            throw new HttpException(
                {
                    message: error.message,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
