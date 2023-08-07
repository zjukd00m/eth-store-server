import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
    @ApiProperty({
        required: false,
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    notifications?: boolean;

    @ApiProperty({
        required: false,
    })
    @IsString()
    @IsOptional()
    profilePicture?: string;

    @ApiProperty({
        required: false,
    })
    @IsString()
    @IsOptional()
    backgroundPicture?: string;
}
