import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsBoolean()
    @IsOptional()
    notifications?: boolean;

    @IsString()
    @IsOptional()
    profilePicture?: string;

    @IsString()
    @IsOptional()
    backgroundPicture?: string;
}
