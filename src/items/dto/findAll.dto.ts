import { PartialType } from '@nestjs/mapped-types';
import {
    IsBooleanString,
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { BaseItemDTO } from './base.dto';

export class FindAllItemsDTO extends PartialType(BaseItemDTO) {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsBooleanString()
    @IsOptional()
    isOnSale?: boolean;

    @IsNumber()
    @IsOptional()
    quantity?: number;

    @IsNumber()
    @IsOptional()
    price?: number;
}
