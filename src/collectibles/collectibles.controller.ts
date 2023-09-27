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
import { CollectiblesService } from './collectibles.service';
import { CreateCollectibleBodyDTO } from './dto/create.dto';
import { UpdateCollectibleBodyDTO } from './dto/update.dto';
import { FindAllCollectiblesDTO } from './dto/findAll.dto';
import { AddToCollectionDTO } from './dto/add-to-collection.dto';
import { AuthInterceptor } from 'src/auth/auth.interceptor';
import { IAuthRequest } from 'src/auth/auth.interfaces';

@Controller({ path: 'api/collectibles' })
export class CollectiblesController {
    constructor(private readonly collectiblesService: CollectiblesService) {}

    @UseInterceptors(AuthInterceptor)
    @Post()
    create(
        @Body() createCollectibleDTO: CreateCollectibleBodyDTO,
        @Req() request: IAuthRequest,
    ) {
        const wallet = request.user.wallet;

        return this.collectiblesService.create({
            ...createCollectibleDTO,
            wallet,
        });
    }

    @UseInterceptors(AuthInterceptor)
    @Put(':id')
    edit(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCollectibleBodyDTO: UpdateCollectibleBodyDTO,
        @Req() request: IAuthRequest,
    ) {
        const wallet = request.user.wallet;
        return this.collectiblesService.edit({
            ...updateCollectibleBodyDTO,
            wallet,
            id,
        });
    }

    @UseInterceptors(AuthInterceptor)
    @Delete(':id')
    delete(
        @Param('id', ParseUUIDPipe) id: string,
        @Req() request: IAuthRequest,
    ) {
        const wallet = request.user.wallet;

        return this.collectiblesService.delete({
            id,
            wallet,
        });
    }

    @Get(':id')
    findOneById(@Param('id', ParseUUIDPipe) id: string) {
        return this.collectiblesService.findOneById({ id });
    }

    @Get()
    findAll(@Query() request: FindAllCollectiblesDTO) {
        return this.collectiblesService.findAll(request);
    }

    @Post('add_to_collection')
    addToCollection(@Body() addToCollectionDTO: AddToCollectionDTO) {
        return this.collectiblesService.addToCollection(addToCollectionDTO);
    }

    @Delete('remove_from_collection/:id')
    removeFromCollection(
        @Param('id', ParseUUIDPipe) id: string,
        @Query('collectionId', ParseUUIDPipe) collectionId: string,
    ) {
        return this.collectiblesService.removeFromCollection({
            collectibleId: id,
            collectionId,
        });
    }
}
