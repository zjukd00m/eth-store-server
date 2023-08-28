import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoredCollection } from './stored-collections.entity';
import { StoredCollectionsController } from './stored-colletion.controller';
import { StoredCollectionsService } from './stored-collection.service';

@Module({
    imports: [TypeOrmModule.forFeature([StoredCollection])],
    controllers: [StoredCollectionsController],
    providers: [StoredCollectionsService],
    exports: [TypeOrmModule, StoredCollectionsService],
})
export class StoredCollectionModule {}
