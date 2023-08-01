import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseUserDTO } from './base.dto';

export class ChangeProfilePicturesDTO extends BaseUserDTO {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    profilePicture?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    backgroundPicture?: string;
}
