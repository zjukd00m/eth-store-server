import {
    IsBooleanString,
    IsEnum,
    IsEthereumAddress,
    IsOptional,
    IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CollectionAddressDTO } from './collection-address.dto';
import { IsTimestamp } from 'src/validators/date.validator';
import { ContractType } from 'src/common/enums/contract.enum';
import { PartialType } from '@nestjs/mapped-types';

export class FindAllCollectionsDTO extends PartialType(CollectionAddressDTO) {
    @IsUUID('4')
    @IsOptional()
    id?: string;

    @ApiProperty()
    @IsEnum(ContractType)
    @IsOptional()
    contractType?: ContractType;

    @ApiProperty()
    @IsEthereumAddress()
    @IsOptional()
    wallet?: string;

    @ApiProperty()
    @IsBooleanString()
    @IsOptional()
    isDeployed?: boolean;

    @ApiProperty()
    @IsTimestamp()
    @IsOptional()
    deployedAt?: Date;
}
