import { IsOptional, IsString } from 'class-validator';

export class CreateStoredCollectionDTO {
    @IsString()
    name: string;

    @IsString()
    symbol: string;

    @IsString()
    @IsOptional()
    coverPicture?: string;

    @IsString()
    @IsOptional()
    backgroundPicture?: string;

    @IsString()
    @IsOptional()
    bannerPictre?: string;

    @IsString()
    @IsOptional()
    metadata?: string;
}
