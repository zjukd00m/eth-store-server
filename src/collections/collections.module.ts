import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { Collection } from './collection.entity';
import { User } from 'src/users/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Collection, User])],
    controllers: [CollectionsController],
    providers: [CollectionsService],
    exports: [TypeOrmModule, CollectionsService],
})
export class CollectionsModule {}
