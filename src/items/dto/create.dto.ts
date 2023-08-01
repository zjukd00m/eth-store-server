import {
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MinLength,
} from 'class-validator';
import { BaseUserDTO } from '../../users/dto/base.dto';

export class CreateItemDTO extends BaseUserDTO {
    @IsString()
    @MinLength(5)
    name: string;

    @MinLength(5)
    @IsString()
    description: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    quantity?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;
}
