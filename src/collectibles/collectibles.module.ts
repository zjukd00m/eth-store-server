import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectiblesService } from './collectibles.service';
import { Collectible } from './collectibles.entity';
import { CollectiblesController } from './collectibles.controller';
import { Collection } from 'src/collections/collection.entity';
import { AuthInterceptor } from 'src/auth/auth.interceptor';
import { JWToken } from 'src/auth/auth.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Collectible, Collection, JWToken])],
    controllers: [CollectiblesController],
    providers: [CollectiblesService, AuthInterceptor],
    exports: [TypeOrmModule, CollectiblesService],
})
export class CollectiblesModule {}
