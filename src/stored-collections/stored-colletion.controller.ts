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
import { FindAllStoredCollectionsDTO } from './dto/findAll.dto';
import UpdateStoredCollectionDTO from './dto/update.dto';
import { DeleteStoredCollectionDTO } from './dto/delete.dto';
import { FindOneStoredCollectionByIdDTO } from './dto/findOneById.dto';
import StoredCollectionIdDTO from './dto/base.dto';

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
    update(
        @Param() params: StoredCollectionIdDTO,
        @Body() request: UpdateStoredCollectionDTO,
    ) {
        const { id } = params;
        return this.storedCollectionsService.update({
            ...request,
            id,
        });
    }

    @Delete(':id')
    delete(@Param() params: DeleteStoredCollectionDTO) {
        const { id } = params;
        return this.storedCollectionsService.delete({ id });
    }

    @Get()
    findAll(@Query() request: FindAllStoredCollectionsDTO) {
        return this.storedCollectionsService.findAll(request);
    }

    @Get(':id')
    findOneById(@Param() params: FindOneStoredCollectionByIdDTO) {
        const { id } = params;
        return this.storedCollectionsService.findOneById({ id });
    }
}
