import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsBase64,
    IsBoolean,
    IsEmail,
    IsEthereumAddress,
    IsOptional,
} from 'class-validator';

export class UpdateUserBodyDTO {
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
    @IsBase64()
    @IsOptional()
    profilePicture?: string;

    @ApiProperty({
        required: false,
    })
    @IsBase64()
    @IsOptional()
    backgroundPicture?: string;
}

export class UpdateUserDTO extends UpdateUserBodyDTO {
    @ApiProperty()
    @Transform(({ value }) => value.toLowerCase())
    @IsEthereumAddress()
    wallet: string;
}
