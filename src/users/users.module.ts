import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
