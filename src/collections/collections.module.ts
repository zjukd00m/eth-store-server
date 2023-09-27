import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { Collection } from './collection.entity';
import { User } from 'src/users/users.entity';
import { AuthInterceptor } from 'src/auth/auth.interceptor';
import { JWToken } from 'src/auth/auth.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Collection, User, JWToken])],
    controllers: [CollectionsController],
    providers: [CollectionsService, AuthInterceptor],
    exports: [TypeOrmModule, CollectionsService],
})
export class CollectionsModule {}
