import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.entity';
import { CreateItemDTO } from './dto/create.dto';
import { UpdateItemDTO } from './dto/update.dto';
import { DeleteItemDTO } from './dto/delete.dto';
import { FindItemByIdDTO } from './dto/findOne.dto';
import { FindAllItemsDTO } from './dto/findAll.dto';
import { BaseItemDTO } from './dto/base.dto';

@Controller({ path: '/api/items' })
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Post()
    create(@Body() request: CreateItemDTO): Promise<Item> {
        return this.itemsService.create(request);
    }

    @Put(':id')
    update(
        @Param() params: BaseItemDTO,
        @Body() request: UpdateItemDTO,
    ): Promise<Item> {
        const { id } = params;
        return this.itemsService.update({
            id,
            ...request,
        });
    }

    @Delete(':id')
    delete(@Param() params: DeleteItemDTO): Promise<Item> {
        const { id } = params;
        return this.itemsService.delete({ id });
    }

    @Get(':id')
    findOneById(@Param() params: FindItemByIdDTO): Promise<Item> {
        const { id } = params;
        return this.itemsService.findOneById({ id });
    }

    @Get()
    findAll(
        @Query() request: FindAllItemsDTO,
    ): Promise<{ items: Array<Item> }> {
        return this.itemsService.findAll(request);
    }
}
