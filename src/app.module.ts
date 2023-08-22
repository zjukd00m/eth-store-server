import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { UsersService } from './users/users.service';
import configuration from '../config/configuration';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { ItemsService } from './items/items.service';
import { MulterModule } from '@nestjs/platform-express';
import { cwd } from 'process';
import { HttpModule } from '@nestjs/axios';
import { NotificationsModule } from './notifications/notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CollectiblesModule } from './collectibles/collectibles.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { EthereumModule } from './ethereum/ethereum.module';
import { EthereumService } from './ethereum/ethereum.service';

console.log({ path: path.join(__dirname, '../.dev.env') });

const BASE_DIR = path.join(cwd(), 'uploads');

console.log({ BASE_DIR });

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
                // host: configService.get('database.host'),
                // port: parseInt(configService.get('database.port')),
                // username: configService.get('database.username'),
                // password: configService.get('database.password'),
                // database: configService.get('database.name'),
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
            dest: BASE_DIR,
        }),
        HttpModule,
        UsersModule,
        ItemsModule,
        NotificationsModule,
        CollectiblesModule,
        EthereumModule,
        AuthModule,
    ],
    providers: [UsersService, ItemsService, AuthService, EthereumService],
})
export class AppModule {}
