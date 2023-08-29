import {
    IsNumberString,
    IsObject,
    IsOptional,
    IsString,
} from 'class-validator';
import { CollectionMetadataDTO } from 'src/collectibles/dto/metadata.dto';

export class CreateStoredCollectionDTO {
    @IsString()
    name: string;

    @IsString()
    symbol: string;

    @IsNumberString()
    maxSupply: string;

    @IsString()
    @IsOptional()
    coverPicture?: string;

    @IsString()
    @IsOptional()
    backgroundPicture?: string;

    @IsObject()
    @IsOptional()
    metadata?: CollectionMetadataDTO;
}
