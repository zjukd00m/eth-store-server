import { IsEnum, IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';
import { CollectibleStandardEnum } from '../stored-collectible.enum';

export class FindAllStoredCollectiblesDTO {
    @IsUUID('4')
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsEnum(CollectibleStandardEnum)
    @IsOptional()
    standard?: CollectibleStandardEnum;

    @IsUrl()
    @IsOptional()
    external_url?: string;

    @IsUrl()
    @IsOptional()
    youtube_url?: string;
}
