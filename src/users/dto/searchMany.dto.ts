import {
    IsBooleanString,
    IsEmail,
    IsEthereumAddress,
    IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { BaseUserDTO } from './base.dto';

export class SearchManyUsersDTO extends PartialType(BaseUserDTO) {
    @Transform(({ value }) => value.toLowerCase())
    @IsEthereumAddress()
    wallet?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsBooleanString()
    @IsOptional()
    confirmed?: boolean;
}
