import { IsOptional, IsString, IsUrl } from 'class-validator';
import { CollectionMetadata } from '../collectibles.interface';

export class CollectionMetadataDTO implements CollectionMetadata {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    image: string;

    @IsUrl()
    @IsOptional()
    external_link?: string;
}
