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
import { UpdateUserDTO } from './dto/update.dto';
import { DeleteUserDTO } from './dto/delete.dto';
import { SearchOneUser } from './dto/searchOne.dto';
import { SearchManyUsersDTO } from './dto/searchMany.dto';
import { User } from './users.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { BaseUserDTO } from './dto/base.dto';

interface UserFiles {
    profilePicture?: Express.Multer.File[];
    backgroundPicture?: Express.Multer.File[];
}

@Controller({ path: '/api/users' })
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() request: CreateUserDTO): Promise<User> {
        return this.usersService.create(request);
    }

    @Put(':wallet')
    update(
        @Param() param: BaseUserDTO,
        @Body() request: UpdateUserDTO,
    ): Promise<User> {
        const { wallet } = param;
        return this.usersService.update(wallet, request);
    }

    @Put('profile_pictures/:wallet')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'profilePicture', maxCount: 1 },
            { name: 'backgroundPicture', maxCount: 1 },
        ]),
    )
    async changeProfilePictures(
        @Param() param: BaseUserDTO,
        @UploadedFiles()
        files: UserFiles,
    ) {
        const { wallet } = param;

        return this.usersService.changeProfilePictures({
            wallet,
            ...(files?.profilePicture?.length && {
                profilePicture:
                    files.profilePicture[0].buffer.toString('base64'),
            }),
            ...(files?.backgroundPicture?.length && {
                backgrounPicture:
                    files.profilePicture[0].buffer.toString('base64'),
            }),
        });
    }

    @Delete(':wallet')
    delete(@Body() request: DeleteUserDTO): Promise<User> {
        return this.usersService.delete(request);
    }

    @Get(':wallet')
    findOneByWallet(@Param() param: SearchOneUser): Promise<User> {
        const { wallet } = param;
        return this.usersService.findOneByWallet({ wallet });
    }

    @Get()
    findAll(
        @Query() request: SearchManyUsersDTO,
    ): Promise<{ users: Array<User> }> {
        return this.usersService.findAll(request);
    }
}
