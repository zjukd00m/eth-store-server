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

export class UpdateItemDTO extends PartialType(BaseItemDTO) {
    @IsString()
    @MinLength(5)
    @IsOptional()
    name?: string;

    @IsString()
    @MinLength(5)
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    isOnSale?: boolean;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    quantity?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;
}
