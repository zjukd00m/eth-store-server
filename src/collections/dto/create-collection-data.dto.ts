import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';
import { IsTimestamp } from 'src/validators/date.validator';

export class CreateCollectionDataDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    symbol: string;

    @IsUrl()
    baseURI: string;

    @IsNumberString()
    @IsOptional()
    maxSupply?: string;

    @IsNumberString()
    @IsOptional()
    preMintPrice?: string;

    @IsTimestamp()
    @IsOptional()
    preMintStartDate?: number;

    @IsTimestamp()
    @IsOptional()
    preMintEndDate?: Date;

    @IsNumberString()
    @IsOptional()
    maxPreMintCollectibles?: string;

    @IsNumber()
    @IsOptional()
    maxPreMintCollectiblesPerWallet?: number;

    @IsNumberString()
    publicMintPrice: string;

    @IsTimestamp()
    publicMintStartDate: Date;

    @IsNumber()
    @IsOptional()
    maxCollectiblesPerWallet?: number;
}
