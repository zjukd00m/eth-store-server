import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoredCollectible } from './stored-collectible.entity';
import { StoredCollectiblesService } from './stored-collectible.service';

@Module({
    imports: [TypeOrmModule.forFeature([StoredCollectible])],
    providers: [StoredCollectiblesService],
    controllers: [StoredCollectiblesService],
    exports: [TypeOrmModule, StoredCollectiblesService],
})
export class StoredCollectibleModule {}
