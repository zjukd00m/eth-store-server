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
import { ApiTags } from '@nestjs/swagger';
import { ParseEthereumAddressPipe } from 'src/pipes/parse-ethereum.pipe';
import { UpdateCollectionBodyDTO } from './dto/update.dto';
import { CreateCollectionDTO } from './dto/create.dto';
import { CollectionsService } from './collections.service';
import { FindAllCollectionsDTO } from './dto/findAll.dto';
import { Collection } from './collection.entity';

@ApiTags('Collections')
@Controller('api/collections')
export class CollectionsController {
    constructor(private readonly collectionsService: CollectionsService) {}

    @Post()
    create(@Body() request: CreateCollectionDTO): Promise<Collection> {
        return this.collectionsService.create(request);
    }

    @Put(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Query('wallet', ParseEthereumAddressPipe) wallet: string,
        @Body() request: UpdateCollectionBodyDTO,
    ): Promise<Collection> {
        return this.collectionsService.update({ id, wallet, ...request });
    }

    @Get(':id')
    findOneById(@Param('id', ParseUUIDPipe) id: string): Promise<Collection> {
        return this.collectionsService.findOneById({ id });
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string): Promise<Collection> {
        return this.collectionsService.delete({ id });
    }

    @Get()
    findAll(@Query() request: FindAllCollectionsDTO): Promise<{
        collections: Collection[];
    }> {
        return this.collectionsService.findAll(request);
    }
}
