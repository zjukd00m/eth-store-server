import { IsEnum, IsEthereumAddress, IsOptional, IsUUID } from 'class-validator';
import { BaseCollectibleDTO } from './base.dto';
import { PartialType } from '@nestjs/mapped-types';
import { CollectibleType } from '../types/collectibles.enum';

export class FindAllColletiblesDTO extends PartialType(BaseCollectibleDTO) {
    @IsUUID('4')
    @IsOptional()
    id?: string;

    @IsEnum(CollectibleType)
    @IsOptional()
    collectibleType?: CollectibleType;

    @IsEthereumAddress()
    @IsOptional()
    wallet?: string;

    @IsUUID('4')
    @IsOptional()
    itemId?: string;
}
