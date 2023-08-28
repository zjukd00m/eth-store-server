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
import { StoredCollectionsService } from './stored-collection.service';
import { CreateStoredCollectionDTO } from './dto/create.dto';
import { FindOneStoredCollectionById } from './dto/findOneById.dto';
import { FindAllStoredCollectionsDTO } from './dto/findAll.dto';
import { DeleteStoredCollectionDTO } from './dto/delete.dto';
import UpdateStoredCollectionDTO from './dto/update.dto';

@Controller({ path: 'api/stored-collections' })
export class StoredCollectionsController {
    constructor(
        private readonly storedCollectionsService: StoredCollectionsService,
    ) {}

    @Post()
    create(@Body() request: CreateStoredCollectionDTO) {
        return this.storedCollectionsService.create(request);
    }

    @Put(':id')
    update(@Body() request: UpdateStoredCollectionDTO) {
        return this.storedCollectionsService.update(request);
    }

    @Delete(':id')
    delete(@Param() request: DeleteStoredCollectionDTO) {
        return this.storedCollectionsService.delete(request);
    }

    @Get()
    findAll(@Query() request: FindAllStoredCollectionsDTO) {
        return this.storedCollectionsService.findAll(request);
    }

    @Get(':id')
    findOneById(@Param() request: FindOneStoredCollectionById) {
        return this.storedCollectionsService.findOneById(request);
    }
}
