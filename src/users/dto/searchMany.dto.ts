import {
    IsBooleanString,
    IsEmail,
    IsEthereumAddress,
    IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { BaseUserDTO } from './base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SearchManyUsersDTO extends PartialType(BaseUserDTO) {
    @ApiProperty({
        required: false,
    })
    @Transform(({ value }) => value.toLowerCase())
    @IsEthereumAddress()
    wallet?: string;

    @ApiProperty({
        required: false,
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
        required: false,
    })
    @IsBooleanString()
    @IsOptional()
    confirmed?: boolean;
}
