import { PartialType } from '@nestjs/mapped-types';
import {
    IsBoolean,
    IsEnum,
    IsEthereumAddress,
    IsNotEmptyObject,
    IsNumber,
    IsObject,
    IsOptional,
} from 'class-validator';
import { ContractType } from 'src/common/enums/contract.enum';
import { CollectibleIdDTO } from './collectible-id.dto';
import { CreateCollectibleMetadataDTO } from './create-collectible-metadata.dto';
import { CreateCollectibleDataDTO } from './create-collectible-data.dto';

export class CreateCollectibleBodyDTO extends PartialType(CollectibleIdDTO) {
    @IsEthereumAddress()
    @IsOptional()
    address?: string;

    @IsNumber()
    @IsOptional()
    supply?: number;

    @IsEnum(ContractType)
    contractType: ContractType;

    @IsBoolean()
    @IsOptional()
    frozenMetadata?: boolean;

    @IsObject()
    @IsNotEmptyObject()
    @IsOptional()
    metadata?: CreateCollectibleMetadataDTO;

    @IsObject()
    @IsNotEmptyObject()
    @IsOptional()
    collectibleData?: CreateCollectibleDataDTO;
}

export class CreateCollectibleDTO extends CreateCollectibleBodyDTO {
    @IsEthereumAddress()
    wallet: string;
}
