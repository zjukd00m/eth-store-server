import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create.dto';
import { UpdateUserBodyDTO } from './dto/update.dto';
import { User } from './users.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { UserFilesDTO } from './dto/changeProfilePictures.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParseEthereumAddressPipe } from 'src/pipes/parse-ethereum.pipe';
import { FindManyUsersDTO } from './dto/findMany.dto';

@ApiTags('Users')
@Controller({ path: '/api/users' })
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() request: CreateUserDTO): Promise<User> {
        return this.usersService.create(request);
    }

    @Put(':wallet')
    update(
        @Param('wallet', ParseEthereumAddressPipe) wallet: string,
        @Body() request: UpdateUserBodyDTO,
    ): Promise<User> {
        return this.usersService.update({
            wallet,
            ...request,
        });
    }

    @Put('profile_pictures/:wallet')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'profilePicture', maxCount: 1 },
            { name: 'backgroundPicture', maxCount: 1 },
        ]),
    )
    async changeProfilePictures(
        @Param('wallet', ParseEthereumAddressPipe) wallet: string,
        @UploadedFiles()
        files: UserFilesDTO,
    ) {
        const filesRequest = {
            wallet,
            ...(files?.profilePicture?.[0]?.size > 0 && {
                profilePicture:
                    files?.profilePicture?.[0]?.buffer.toString('base64'),
            }),
            ...(files?.backgroundPicture?.[0]?.size > 0 && {
                backgroundPicture:
                    files?.backgroundPicture?.[0]?.buffer.toString('base64'),
            }),
        };

        return this.usersService.changeProfilePictures(filesRequest);
    }

    @Delete(':wallet')
    delete(
        @Param('wallet', ParseEthereumAddressPipe) wallet: string,
    ): Promise<User> {
        return this.usersService.delete({ wallet });
    }

    @Get(':wallet')
    findOneByWallet(
        @Param('wallet', ParseEthereumAddressPipe) wallet: string,
    ): Promise<User> {
        return this.usersService.findOneByWallet({ wallet });
    }

    @Get()
    findAll(
        @Query() request: FindManyUsersDTO,
    ): Promise<{ users: Array<User> }> {
        return this.usersService.findAll(request);
    }
}
