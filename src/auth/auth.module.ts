import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { EthereumModule } from 'src/ethereum/ethereum.module';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { JWToken } from './auth.entity';

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('jwt.key'),
                signOptions: {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: false,
                    expiresIn: configService.get('jwt.expiresIn'),
                },
                verifyOptions: {
                    algorithms: ['HS256'],
                    ignoreExpiration: false,
                },
            }),
        }),
        EthereumModule,
        TypeOrmModule.forFeature([User, JWToken]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [TypeOrmModule, AuthService],
})
export class AuthModule {}
