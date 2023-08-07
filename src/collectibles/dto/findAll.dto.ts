import { IsEnum, IsEthereumAddress, IsOptional, IsUUID } from 'class-validator';
import { BaseCollectibleDTO } from './base.dto';
import { PartialType } from '@nestjs/mapped-types';
import { CollectibleType } from '../types/collectibles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllColletiblesDTO extends PartialType(BaseCollectibleDTO) {
    @ApiProperty()
    @IsUUID('4')
    @IsOptional()
    id?: string;

    @ApiProperty()
    @IsEnum(CollectibleType)
    @IsOptional()
    collectibleType?: CollectibleType;

    @ApiProperty()
    @IsEthereumAddress()
    @IsOptional()
    wallet?: string;

    @ApiProperty()
    @IsUUID('4')
    @IsOptional()
    itemId?: string;
}
