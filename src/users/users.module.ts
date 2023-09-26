import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthInterceptor } from 'src/auth/auth.interceptor';
import { JWToken } from 'src/auth/auth.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, JWToken])],
    providers: [UsersService, AuthInterceptor],
    controllers: [UsersController],
    exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
