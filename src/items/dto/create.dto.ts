import {
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MinLength,
} from 'class-validator';
import { BaseUserDTO } from '../../users/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDTO extends BaseUserDTO {
    @ApiProperty()
    @IsString()
    @MinLength(5)
    name: string;

    @ApiProperty()
    @MinLength(5)
    @IsString()
    description: string;

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
