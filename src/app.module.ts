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
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => (
                console.log(configService.get('database')),
                console.log(configService.get('typeorm')),
                {
                    type: 'postgres',
                    url: configService.get('database.uri'),
                    synchronize: configService.get('typeorm.synchronize'),
                    logging: true,
                    entities: ['./dist/src/**/*.entity.js'],
                    migrations: ['./dist/src/database/migrations/**/*.js}'],
                }
            ),
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
    ],
    providers: [UsersService, ItemsService],
})
export class AppModule {}
