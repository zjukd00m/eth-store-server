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
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCollectionBodyDTO } from './dto/update.dto';
import { CreateCollectionBodyDTO } from './dto/create.dto';
import { CollectionsService } from './collections.service';
import { FindAllCollectionsDTO } from './dto/findAll.dto';
import { Collection } from './collection.entity';
import { AuthInterceptor } from 'src/auth/auth.interceptor';
import { IAuthRequest } from 'src/auth/auth.interfaces';

@ApiTags('Collections')
@Controller('api/collections')
export class CollectionsController {
    constructor(private readonly collectionsService: CollectionsService) {}

    @UseInterceptors(AuthInterceptor)
    @Post()
    create(
        @Body() createCollectionDTO: CreateCollectionBodyDTO,
        @Req() request: IAuthRequest,
    ): Promise<Collection> {
        const wallet = request.user.wallet;
        return this.collectionsService.create({
            ...createCollectionDTO,
            wallet,
        });
    }

    @UseInterceptors(AuthInterceptor)
    @Put(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCollectionBodyDTO: UpdateCollectionBodyDTO,
        @Req() request: IAuthRequest,
    ): Promise<Collection> {
        const wallet = request.user.wallet;

        return this.collectionsService.update({
            id,
            wallet,
            ...updateCollectionBodyDTO,
        });
    }

    @UseInterceptors(AuthInterceptor)
    @Get(':id')
    findOneById(
        @Param('id', ParseUUIDPipe) id: string,
        @Req() request: IAuthRequest,
    ): Promise<Collection> {
        const wallet = request.user.wallet;
        return this.collectionsService.findOneById({ id, wallet });
    }

    @UseInterceptors(AuthInterceptor)
    @Delete(':id')
    delete(
        @Param('id', ParseUUIDPipe) id: string,
        @Req() request: IAuthRequest,
    ): Promise<Collection> {
        const wallet = request.user.wallet;
        return this.collectionsService.delete({ id, wallet });
    }

    // Public find all
    @Get()
    findAll(@Query() findAllCollectionsDTO: FindAllCollectionsDTO): Promise<{
        collections: Collection[];
    }> {
        return this.collectionsService.findAll({
            ...findAllCollectionsDTO,
        });
    }

    // TODO: Create a 'private' find all where only the deployer can see its items
}
