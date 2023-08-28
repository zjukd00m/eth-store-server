import { IsObject, IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';

export class UpdateStoredCollectibleDTO {
    @IsUUID('4')
    id: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsOptional()
    external_url?: string;

    @IsUrl()
    @IsOptional()
    youtube_url?: string;

    @IsObject()
    @IsOptional()
    medata?: Record<string, string>;
}
