import { PartialType } from '@nestjs/mapped-types';
import {
    IsBoolean,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MinLength,
} from 'class-validator';
import { BaseItemDTO } from './base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDTO extends PartialType(BaseItemDTO) {
    @ApiProperty()
    @IsString()
    @MinLength(5)
    @IsOptional()
    name?: string;

    @ApiProperty()
    @IsString()
    @MinLength(5)
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isOnSale?: boolean;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsOptional()
    quantity?: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;
}
