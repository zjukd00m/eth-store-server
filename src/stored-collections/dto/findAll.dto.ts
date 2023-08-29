import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

export class FindAllStoredCollectionsDTO {
    @IsUUID('4')
    @IsOptional()
    id?: string;

    @IsUUID('4')
    @IsOptional()
    userId?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsDate()
    @IsOptional()
    createdAt?: Date;
}
