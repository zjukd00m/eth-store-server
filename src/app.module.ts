import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { cwd } from 'process';
import configuration from '../config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CollectionsModule } from './collections/collections.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { EthereumModule } from './ethereum/ethereum.module';
import { AuthService } from './auth/auth.service';
import { EthereumService } from './ethereum/ethereum.service';
import { CollectionsService } from './collections/collections.service';
import { TransactionsService } from './transactions/transactions.service';
import { UsersService } from './users/users.service';
import { NotificationsService } from './notifications/notifications.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: path.join(__dirname, '../.dev.env'),
            load: [configuration],
            validationOptions: {
                allowUnkwnown: false,
                abortEarly: false,
            },
        }),
        JwtModule.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                global: true,
                secretOrPrivateKey: configService.get('jwt.key'),
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
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get('database.url'),
                synchronize: true,
                logging: true,
                entities: ['./dist/src/**/*.entity.js'],
                migrations: ['./dist/src/database/migrations/**/*.js}'],
            }),
        }),
        EventEmitterModule.forRoot({
            delimiter: '.',
            newListener: false,
            removeListener: false,
            maxListeners: 10,
            verboseMemoryLeak: false,
            ignoreErrors: false,
        }),
        MulterModule.register({
            dest: path.join(cwd(), 'uploads'),
        }),
        UsersModule,
        NotificationsModule,
        CollectionsModule,
        EthereumModule,
        AuthModule,
        TransactionsModule,
    ],
    providers: [
        UsersService,
        AuthService,
        EthereumService,
        CollectionsService,
        TransactionsService,
        NotificationsService,
    ],
})
export class AppModule {}
