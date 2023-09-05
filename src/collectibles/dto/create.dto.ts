import {
    IsBoolean,
    IsEnum,
    IsEthereumAddress,
    IsNotEmptyObject,
    IsNumber,
    IsObject,
    IsOptional,
    Min,
} from 'class-validator';
import { ContractType } from 'src/common/enums/contract.enum';
import { CreateCollectibleMetadataDTO } from './create-collectible-metadata.dto';
import { CreateCollectibleDataDTO } from './create-collectible-data.dto';
import { Transform } from 'class-transformer';

export class CreateCollectibleBodyDTO {
    @Transform(({ value }) => value?.toLowerCase() || null)
    @IsEthereumAddress()
    @IsOptional()
    address?: string;

    @IsNumber()
    @IsOptional()
    @Min(1)
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
    @Transform(({ value }) => value?.toLowerCase())
    @IsEthereumAddress()
    wallet: string;
}
