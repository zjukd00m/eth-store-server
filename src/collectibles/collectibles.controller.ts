import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FindAllColletiblesDTO } from './dto/findAll.dto';
import { FindOneCollectibleDTO } from './dto/findOne.dto';
import { CreateCollectibleDTO } from './dto/create.dto';

@Controller()
export class CollectiblesController {
    constructor(private readonly collectiblesService: any) {}

    @Post()
    create(@Body() request: CreateCollectibleDTO) {
        return this.collectiblesService.create(request);
    }

    @Put(':address')
    update(@Param() params: any, @Body() request) {
        const { address } = params;

        return this.collectiblesService.update({ ...request, address });
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
