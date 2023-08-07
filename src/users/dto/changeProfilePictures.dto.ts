import { ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { BaseUserDTO } from './base.dto';
import { IsOptional, IsString } from 'class-validator';

export class ChangeProfilePicturesDTO extends BaseUserDTO {
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
