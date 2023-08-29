import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoredCollectible } from './stored-collectible.entity';
import { StoredCollectiblesService } from './stored-collectible.service';
import { StoredCollectiblesController } from './stored-collectible.controller';

@Module({
    imports: [TypeOrmModule.forFeature([StoredCollectible])],
    providers: [StoredCollectiblesService],
    controllers: [StoredCollectiblesController],
    exports: [TypeOrmModule, StoredCollectiblesService],
})
export class StoredCollectibleModule {}
