import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.entity';
import { CreateItemDTO } from './dto/create.dto';
import { DeleteItemParamsDTO, DeleteItemQueryDTO } from './dto/delete.dto';
import { FindItemByIdDTO } from './dto/findOne.dto';
import { FindAllItemsDTO } from './dto/findAll.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiTags('Items')
@Controller({ path: '/api/items' })
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() request: CreateItemDTO): Promise<Item> {
        return this.itemsService.create(request);
    }

    @Delete(':address')
    delete(
        @Param() params: DeleteItemParamsDTO,
        @Query() query: DeleteItemQueryDTO,
    ): Promise<Item> {
        const { address } = params;
        const { inTrash } = query;

        return this.itemsService.delete({
            address,
            ...(parseInt(inTrash) <= 0
                ? { inTrash: false }
                : { inTrash: true }),
        });
    }

    @Get(':address')
    findOneById(@Param() params: FindItemByIdDTO): Promise<Item> {
        const { address } = params;
        return this.itemsService.findOneById({ address });
    }

    @Get()
    findAll(
        @Query() request: FindAllItemsDTO,
    ): Promise<{ items: Array<Item> }> {
        return this.itemsService.findAll(request);
    }
}
