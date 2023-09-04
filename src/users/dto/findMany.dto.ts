import { IsBooleanString, IsEmail, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { UserWalletDTO } from './user-wallet.dto';

export class FindManyUsersDTO extends PartialType(UserWalletDTO) {
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
