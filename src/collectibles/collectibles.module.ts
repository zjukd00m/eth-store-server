import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectiblesService } from './collectibles.service';
import { Collectible } from './collectibles.entity';
import { CollectiblesController } from './collectibles.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Collectible])],
    controllers: [CollectiblesController],
    providers: [CollectiblesService],
    exports: [TypeOrmModule, CollectiblesService],
})
export class CollectibleModule {}
