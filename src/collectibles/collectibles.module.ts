import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collectible } from './collectibles.entity';
import { CollectiblesController } from './collectibles.controller';
import { CollectiblesService } from './collectibles.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([Collectible])],
    controllers: [CollectiblesController],
    providers: [CollectiblesService],
    exports: [TypeOrmModule, CollectiblesService],
})
export class CollectiblesModule {}
