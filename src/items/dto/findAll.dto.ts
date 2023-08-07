import { PartialType } from '@nestjs/mapped-types';
import {
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';
import { BaseItemDTO } from './base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllItemsDTO extends PartialType(BaseItemDTO) {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @ApiProperty()
    @IsUUID('4')
    @IsOptional()
    creatorId: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    quantity?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    price?: number;
}
