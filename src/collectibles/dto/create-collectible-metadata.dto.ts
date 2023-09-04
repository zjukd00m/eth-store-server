import {
    IsNotEmpty,
    IsNotEmptyObject,
    IsObject,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';
import {
    CollectibleAttributes,
    CollectibleMetadata,
} from '../collectibles.interfaces';

export class CreateCollectibleMetadataDTO implements CollectibleMetadata {
    @IsUrl()
    image: string;

    @IsUrl()
    external_url: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsObject()
    @IsNotEmptyObject()
    @IsOptional()
    attributes?: CollectibleAttributes[];

    @IsString()
    @IsOptional()
    background_color?: string;

    @IsUrl()
    @IsOptional()
    animation_url?: string;

    @IsUrl()
    @IsOptional()
    youtube_url?: string;
}
