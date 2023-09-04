import {
    IsBoolean,
    IsEthereumAddress,
    IsNotEmptyObject,
    IsNumber,
    IsObject,
    IsOptional,
    IsUUID,
} from 'class-validator';
import { UpdateCollectibleMetadataDTO } from './update-collectible-metadata.dto';
import { UpdateCollectibleDataDTO } from './update-collectible-data.dto';

export class UpdateCollectibleBodyDTO {
    @IsBoolean()
    @IsOptional()
    isDeployed?: boolean;

    @IsEthereumAddress()
    @IsOptional()
    address?: string;

    @IsObject()
    @IsNotEmptyObject()
    @IsOptional()
    metadata?: UpdateCollectibleMetadataDTO;

    @IsObject()
    @IsNotEmptyObject()
    @IsOptional()
    collectibleData?: UpdateCollectibleDataDTO;

    @IsBoolean()
    @IsOptional()
    frozenMetadata?: boolean;

    @IsNumber()
    @IsOptional()
    supply: number;

    @IsUUID('4')
    @IsOptional()
    collectionId: string;
}

export class UpdateCollectibleDTO extends UpdateCollectibleBodyDTO {
    @IsUUID('4')
    id: string;
}
