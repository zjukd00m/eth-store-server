import { PartialType } from '@nestjs/mapped-types';
import {
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';
import { BaseItemDTO } from './base.dto';

export class FindAllItemsDTO extends PartialType(BaseItemDTO) {
    @IsString()
    @IsOptional()
    name?: string;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsUUID('4')
    @IsOptional()
    creatorId: string;

    @IsNumber()
    @IsOptional()
    quantity?: number;

    @IsNumber()
    @IsOptional()
    price?: number;
}
