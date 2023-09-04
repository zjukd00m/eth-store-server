import { ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UserWalletDTO } from './user-wallet.dto';

export class ChangeProfilePicturesDTO extends UserWalletDTO {
    @IsString()
    @IsOptional()
    profilePicture?: string;

    @IsString()
    @IsOptional()
    backgroundPicture?: string;
}

@ApiConsumes('multipart/form-data')
export class UserFilesDTO {
    @ApiProperty({
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
        },
        required: false,
    })
    profilePicture?: Express.Multer.File[];

    @ApiProperty({
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
        },
        required: false,
    })
    backgroundPicture?: Express.Multer.File[];
}
