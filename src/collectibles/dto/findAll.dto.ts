import {
    IsBooleanString,
    IsEnum,
    IsEthereumAddress,
    IsNumberString,
    IsOptional,
} from 'class-validator';
import { CollectibleIdDTO } from './collectible-id.dto';
import { ContractType } from 'src/common/enums/contract.enum';
import { Transform } from 'class-transformer';
import { IsTimestamp } from 'src/validators/date.validator';
import { PartialType } from '@nestjs/mapped-types';

export class FindAllCollectiblesDTO extends PartialType(CollectibleIdDTO) {
    @IsBooleanString()
    @IsOptional()
    frozenMetadata?: boolean;

    @IsNumberString()
    @IsOptional()
    supply?: number;

    @Transform(({ value }) => value?.toLowerCase() || null)
    @IsEthereumAddress()
    @IsOptional()
    address?: string;

    @IsEnum(ContractType)
    @IsOptional()
    contractType?: ContractType;

    @IsBooleanString()
    @IsOptional()
    isDeployed?: boolean;

    @IsTimestamp()
    @IsOptional()
    deployedAt?: Date;
}
