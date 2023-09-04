import {
    IsBoolean,
    IsEthereumAddress,
    IsNotEmptyObject,
    IsObject,
    IsOptional,
    IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UpdateColletionMetadataDTO } from './update-collection-metadata.dto';
import { UpdateCollectionDataDTO } from './update-collection-data.dto';

export class UpdateCollectionBodyDTO {
    @IsBoolean()
    @IsOptional()
    isDeployed?: boolean;

    @Transform(({ value }) => value?.toLowerCase() || null)
    @IsEthereumAddress()
    @IsOptional()
    address?: string;

    @IsObject()
    @IsNotEmptyObject()
    @IsOptional()
    metadata?: UpdateColletionMetadataDTO;

    @IsObject()
    @IsNotEmptyObject()
    @IsOptional()
    contractData?: UpdateCollectionDataDTO;
}

export class UpdateCollectionDTO extends UpdateCollectionBodyDTO {
    @IsUUID('4')
    id: string;

    @Transform(({ value }) => value.toLowerCase())
    @IsEthereumAddress()
    wallet: string;
}
