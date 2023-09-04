import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { CollectiblesService } from './collectibles.service';
import { CreateCollectibleDTO } from './dto/create.dto';
import { UpdateCollectibleBodyDTO } from './dto/update.dto';
import { FindAllCollectiblesDTO } from './dto/findAll.dto';

@Controller({ path: 'api/collectibles' })
export class CollectiblesController {
    constructor(private readonly collectiblesService: CollectiblesService) {}

    @Post()
    create(request: CreateCollectibleDTO) {
        return this.collectiblesService.create(request);
    }

    @Put(':id')
    edit(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() request: UpdateCollectibleBodyDTO,
    ) {
        return this.collectiblesService.edit({
            ...request,
            id,
        });
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.collectiblesService.delete(id);
    }

    @Get(':id')
    findOneById(@Param('id', ParseUUIDPipe) id: string) {
        return this.collectiblesService.findOneById(id);
    }

    @Get()
    findAll(@Query() request: FindAllCollectiblesDTO) {
        return this.collectiblesService.findAll(request);
    }
}
