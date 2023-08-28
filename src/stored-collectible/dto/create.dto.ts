import { IsObject, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateStoredCollectibleDTO {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsObject()
    medata: Record<string, string>;

    @IsUrl()
    @IsOptional()
    external_url?: string;

    @IsUrl()
    @IsOptional()
    youtube_url?: string;
}
