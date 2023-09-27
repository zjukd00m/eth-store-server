import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UnauthorizedException,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create.dto';
import { UpdateUserBodyDTO } from './dto/update.dto';
import { User } from './users.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import {
    ChangeProfilePicturesDTO,
    UserFilesDTO,
} from './dto/changeProfilePictures.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParseEthereumAddressPipe } from 'src/pipes/parse-ethereum.pipe';
import { FindManyUsersDTO } from './dto/findMany.dto';
import { AuthInterceptor } from 'src/auth/auth.interceptor';
import { IAuthRequest } from 'src/auth/auth.interfaces';

@ApiTags('Users')
@Controller({ path: '/api/users' })
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() request: CreateUserDTO): Promise<User> {
        return this.usersService.create(request);
    }

    @UseInterceptors(AuthInterceptor)
    @Put(':wallet')
    update(
        @Param('wallet', ParseEthereumAddressPipe) wallet: string,
        @Body() updateUserDTO: UpdateUserBodyDTO,
        @Req() request: IAuthRequest,
    ): Promise<User> {
        if (request.user.wallet !== wallet) {
            throw new UnauthorizedException();
        }

        return this.usersService.update({
            wallet,
            ...updateUserDTO,
        });
    }

    @Put('profile_pictures/:wallet')
    @UseInterceptors(AuthInterceptor)
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
        @Req() request: IAuthRequest,
    ) {
        if (request.user.wallet !== wallet) {
            throw new UnauthorizedException();
        }

        const filesRequest: ChangeProfilePicturesDTO = {
            wallet,
            ...(files?.profilePicture?.length && {
                profilePicture:
                    files.profilePicture[0].buffer.toString('base64'),
            }),
            ...(files?.backgroundPicture?.length && {
                backgroundPicture:
                    files.backgroundPicture[0].buffer.toString('base64'),
            }),
        };

        return this.usersService.changeProfilePictures(filesRequest);
    }

    @UseInterceptors(AuthInterceptor)
    @Delete(':wallet')
    delete(
        @Param('wallet', ParseEthereumAddressPipe) wallet: string,
        @Req() request: IAuthRequest,
    ): Promise<User> {
        if (request.user.wallet !== wallet) {
            throw new UnauthorizedException();
        }

        return this.usersService.delete({ wallet });
    }

    @UseInterceptors(AuthInterceptor)
    @Get('profile')
    getMyProfile(@Req() request: IAuthRequest): Promise<User> {
        const wallet = request.user.wallet;

        return this.usersService.getMyProfile({ wallet });
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
