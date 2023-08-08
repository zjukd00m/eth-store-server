import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FindAllColletiblesDTO } from './dto/findAll.dto';
import { FindOneCollectibleDTO } from './dto/findOne.dto';
import { CreateCollectibleDTO } from './dto/create.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCollectibleParamsDTO } from './dto/update.dto';
import { CollectiblesService } from './collectibles.service';

@ApiTags('Collectibles')
@Controller('api/collectibles')
export class CollectiblesController {
    constructor(private readonly collectiblesService: CollectiblesService) {}

    @Post()
    create(@Body() request: CreateCollectibleDTO) {
        return this.collectiblesService.create(request);
    }

    @Put(':address')
    update(@Param() params: UpdateCollectibleParamsDTO, @Body() request) {
        const { address } = params;
        const { wallet } = request;

        return this.collectiblesService.update({ address, wallet });
    }

    @Get(':address')
    findOneById(@Param() params: FindOneCollectibleDTO) {
        const { address } = params;
        return this.collectiblesService.findOneById({ address });
    }

    @Get()
    findAll(@Query() request: FindAllColletiblesDTO) {
        return this.collectiblesService.findAll(request);
    }
}
