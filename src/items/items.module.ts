import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
    imports: [TypeOrmModule.forFeature([Item]), HttpModule],
    controllers: [ItemsController],
    providers: [ItemsService],
    exports: [TypeOrmModule, ItemsService],
})
export class ItemsModule {}
