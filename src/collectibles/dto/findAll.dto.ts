import {
    IsBoolean,
    IsEnum,
    IsEthereumAddress,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { CollectibleIdDTO } from './collectible-id.dto';
import { ContractType } from 'src/common/enums/contract.enum';
import { Transform } from 'class-transformer';
import { IsTimestamp } from 'src/validators/date.validator';

export class FindAllCollectiblesDTO extends CollectibleIdDTO {
    @IsBoolean()
    @IsOptional()
    frozenMetata?: boolean;

    @IsNumber()
    @IsOptional()
    supply?: number;

    @Transform(({ value }) => value?.toLowerCase() || null)
    @IsEthereumAddress()
    @IsOptional()
    address?: string;

    @IsEnum(ContractType)
    @IsOptional()
    contractType?: ContractType;

    @IsBoolean()
    @IsOptional()
    isDeployed?: boolean;

    @IsTimestamp()
    @IsOptional()
    deployedAt?: Date;
}
