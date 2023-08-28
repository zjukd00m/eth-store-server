import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsEthereumAddress, IsOptional, IsUUID } from 'class-validator';
import { BaseItemDTO } from './base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllItemsDTO extends PartialType(BaseItemDTO) {
    @ApiProperty()
    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @ApiProperty()
    @IsUUID('4')
    @IsOptional()
    creatorId?: string;

    @ApiProperty()
    @IsEthereumAddress()
    @IsOptional()
    wallet?: string;
}
