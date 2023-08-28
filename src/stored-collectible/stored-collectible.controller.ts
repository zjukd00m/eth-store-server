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
import { StoredCollectiblesService } from './stored-collectible.service';
import { CreateStoredCollectibleDTO } from './dto/create.dto';
import { DeleteStoredCollectibleDTO } from './dto/delete.dto';
import { FindAllStoredCollectiblesDTO } from './dto/findAll.dto';
import { UpdateStoredCollectibleDTO } from './dto/update.dto';
import FindOneStoredColletibleByIdDTO from './dto/findOne.dto';

@Controller({ path: 'api/stored-collections' })
export class StoredCollectiblesController {
    constructor(
        private readonly storedCollectiblesService: StoredCollectiblesService,
    ) {}

    @Post()
    create(@Body() request: CreateStoredCollectibleDTO) {
        return this.storedCollectiblesService.create(request);
    }

    @Put(':id')
    update(@Body() request: UpdateStoredCollectibleDTO) {
        return this.storedCollectiblesService.update(request);
    }

    @Delete(':id')
    delete(@Param() request: DeleteStoredCollectibleDTO) {
        return this.storedCollectiblesService.delete(request);
    }

    @Get()
    findAll(@Query() request: FindAllStoredCollectiblesDTO) {
        return this.storedCollectiblesService.findAll(request);
    }

    @Get(':id')
    findOneById(@Param() request: FindOneStoredColletibleByIdDTO) {
        return this.storedCollectiblesService.findOneById(request);
    }
}
